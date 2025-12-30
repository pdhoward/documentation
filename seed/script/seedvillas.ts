// seedUnits.ts
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { villas } from '../data/villas/index.js'; 

const url = process.env.DB;
const dbName = process.env.WEBDBNAME;

async function seedVillas() {  

  if (!url || !dbName) {
    console.error('Missing DB or WEBDBNAME env vars');
    process.exit(1);
  }

  const client = new MongoClient(url);

  await client.connect();
  console.log('Connected to MongoDB');

  const db = client.db(dbName);
  const villasCollection = db.collection('villas'); 

  try {
    // Drop ONLY the units collection if it exists
    const existing = await db.listCollections({ name: 'villas' }).toArray();
    if (existing.length) {
      await db.collection('villas').drop();
      console.log('Dropped villas collection');
    }      

    // Insert
    const result = await villasCollection.insertMany(villas, { ordered: true });
    console.log(`Inserted ${result.insertedCount} units`);

  } catch (err) {
    console.error('Error seeding units:', err);
    process.exitCode = 1;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedVillas().catch((e) => {
  console.error(e);
  process.exit(1);
});
