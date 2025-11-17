// seedUnits.ts
import 'dotenv/config';
import { ObjectId, Db } from 'mongodb';
import getMongoConnection from '../../src/db/connections/index.js'; // adjust if needed
import { units } from '../data/units/index.js'; // your merged array

// --- helpers ---
const hex24 = (s: unknown): s is string => typeof s === 'string' && /^[0-9a-fA-F]{24}$/.test(s);
const asObjectId = (v: unknown): ObjectId => {
  if (v instanceof ObjectId) return v;
  if (hex24(v)) return new ObjectId(v);
  throw new Error(`Expected 24-hex string for ObjectId, got: ${String(v)}`);
};

function normalizeUnit(u: any) {
  // Force _id and calendars[].calendarId to ObjectId (critical for reservations.unitId / calendar joins)
  const calendars = Array.isArray(u.calendars)
    ? u.calendars.map((c: any) => ({ ...c, calendarId: asObjectId(c.calendarId) }))
    : u.calendars;

  // Dates: ensure Date instances
  const createdAt = u.createdAt ? new Date(u.createdAt) : undefined;
  const updatedAt = u.updatedAt ? new Date(u.updatedAt) : undefined;

  return {
    ...u,
    _id: asObjectId(u._id),
    calendars,
    createdAt,
    updatedAt,
  };
}

// --- Verify that each unit's calendars[].calendarId exists in calendars collection
async function verifyCalendarRefs(db: Db, unitIds: ObjectId[]) {
  const unitsCol = db.collection("units");
  const calendarsCol = db.collection("calendars");

  // Pull just what we need from the units we inserted
  const units = await unitsCol
    .find(
      { _id: { $in: unitIds } },
      { projection: { name: 1, unitNumber: 1, calendars: 1 } }
    )
    .toArray();

  const refHexSet = new Set<string>();
  const unitCalMap: Array<{
    unitId: ObjectId;
    name?: string;
    unitNumber?: string;
    calendarIds: ObjectId[];
    badTypeIds: any[];
  }> = [];

  const isHex24 = (s: unknown): s is string =>
    typeof s === "string" && /^[0-9a-fA-F]{24}$/.test(s);

  for (const u of units) {
    const calendarIds: ObjectId[] = [];
    const badTypeIds: any[] = [];
    const arr = Array.isArray(u.calendars) ? u.calendars : [];

    for (const c of arr) {
      const id = c?.calendarId;

      if (id instanceof ObjectId) {
        calendarIds.push(id);
        refHexSet.add(id.toHexString());
      } else if (isHex24(id)) {
        const oid = new ObjectId(id);
        calendarIds.push(oid);
        refHexSet.add(oid.toHexString());
      } else if (id != null) {
        badTypeIds.push(id); // neither ObjectId nor hex string
      }
    }

    unitCalMap.push({
      unitId: u._id as ObjectId,
      name: u.name as string | undefined,
      unitNumber: u.unitNumber as string | undefined,
      calendarIds,
      badTypeIds,
    });
  }

  if (refHexSet.size === 0) {
    console.log("Calendar check: No calendar references found on inserted units.");
    return;
  }

  const refIds = Array.from(refHexSet, (hex) => new ObjectId(hex));
  const existing = await calendarsCol
    .find({ _id: { $in: refIds } }, { projection: { _id: 1 } })
    .toArray();
  const existingSet = new Set(existing.map((c) => c._id.toHexString()));

  const problems: Array<{
    unitId: string;
    name?: string;
    unitNumber?: string;
    missing: string[];
    badType: any[];
  }> = [];

  for (const entry of unitCalMap) {
    const missing: string[] = [];

    for (const id of entry.calendarIds) {
      const hex = id.toHexString();
      if (!existingSet.has(hex)) missing.push(hex);
    }

    if (missing.length || entry.badTypeIds.length) {
      problems.push({
        unitId: entry.unitId.toHexString(),
        name: entry.name,
        unitNumber: entry.unitNumber,
        missing,
        badType: entry.badTypeIds,
      });
    }
  }

  if (problems.length) {
    console.warn("Calendar reference issues found:");
    for (const p of problems) {
      if (p.missing.length) {
        console.warn(
          `  Unit ${p.name ?? ""} (#${p.unitNumber ?? ""}, _id=${p.unitId}) missing calendars:`,
          p.missing
        );
      }
      if (p.badType.length) {
        console.warn(
          `  Unit ${p.name ?? ""} (#${p.unitNumber ?? ""}, _id=${p.unitId}) has non-ObjectId/hex calendarId values:`,
          p.badType
        );
      }
    }
  } else {
    console.log("All unit calendar references resolve to existing calendars. ✅");
  }
}


async function seedUnits() {
  const url = process.env.DB;
  const dbName = process.env.MAINDBNAME;

  if (!url || !dbName) {
    console.error('Missing DB or MAINDBNAME env vars');
    process.exit(1);
  }

  const { client, db } = await getMongoConnection(url, dbName);
  console.log('Connected to MongoDB');

  try {
    // Drop ONLY the units collection if it exists
    const existing = await db.listCollections({ name: 'units' }).toArray();
    if (existing.length) {
      await db.collection('units').drop();
      console.log('Dropped units collection');
    }

    const unitsCollection = db.collection('units');
    //const reservationsCollection = db.collection('reservations'); // used for verification

    // Normalize docs (coerce ObjectIds + dates)
    const docs = units.map(normalizeUnit);

    // (Optional) helpful indexes
    await unitsCollection.createIndex({ tenantId: 1 });
    await unitsCollection.createIndex({ unit_id: 1 }, { unique: true }); // your string unit key
    await unitsCollection.createIndex({ slug: 1 }, { unique: true }); // if slugs are unique per tenant, adjust to {tenantId, slug}

    // Insert
    const result = await unitsCollection.insertMany(docs, { ordered: true });
    console.log(`Inserted ${result.insertedCount} units`);

    const insertedIds = Object.values(result.insertedIds) as ObjectId[];

    // --- Verification: confirm reservations reference existing units ---
    // For each inserted _id, check if at least one reservation points to it (info-level, not a hard error)
  
      await (async () => {
        const reservationsCol = db.collection("reservations");
        const missingRefs: string[] = [];
        for (const id of insertedIds) {
          const found = await reservationsCol.findOne({ unitId: id });
          if (!found) missingRefs.push(id.toHexString());
        }
        if (missingRefs.length) {
          console.log(
            `Note: ${missingRefs.length} unit(s) have no matching reservation.unitId yet:`,
            missingRefs
          );
        } else {
          console.log("All inserted units have at least one reservation referencing them (nice!).");
        }
      })();

      // ✅ Verify calendars via ObjectId
    await verifyCalendarRefs(db, insertedIds);

  } catch (err) {
    console.error('Error seeding units:', err);
    process.exitCode = 1;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedUnits().catch((e) => {
  console.error(e);
  process.exit(1);
});
