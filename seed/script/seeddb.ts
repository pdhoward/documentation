//////////////////////////////////////////////////
// collect key info for all components         ////
//   assemble profiles for all agents          ///
//////////////////////////////////////////////////
import 'dotenv/config';
import { agentProfiles } from '../data/agentprofiles/index.js';
import {agentInstructions} from '../data/instructions/index.js'
import getMongoConnection from '../db/connections/index.js'; 

const gradients = [
  "bg-gradient-to-br from-blue-500 to-purple-600",
  "bg-gradient-to-br from-red-500 to-orange-600",
  "bg-gradient-to-br from-yellow-500 to-red-600",
  "bg-gradient-to-br from-green-500 to-teal-600",
];

async function seedAgents() {
  const url = process.env.DB; // Your MongoDB URL (update as needed)
  const dbName = process.env.MAINDBNAME; // Your DB name (update as needed)

  if (!url || !dbName) {
      console.log({ error: 'Missing database configuration' }, { status: 500 });
      return
  }
  
  const { client, db } = await getMongoConnection(url, dbName);

   console.log('Connected to MongoDB');

  try {
    // Check and drop collections if they exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c: any) => c.name);

    if (collectionNames.includes('tenants')) {
      await db.collection('tenants').drop();
      console.log('Dropped tenants collection');
    }
    if (collectionNames.includes('agentconfigs')) {
      await db.collection('agentconfigs').drop();
      console.log('Dropped agentconfigs collection');
    }
   
    const agentCollection = db.collection('agentprofiles');

    // Clear existing documents in the collection
    const deleteResult = await agentCollection.deleteMany({});
    console.log(`Dropped ${deleteResult.deletedCount} agent profiles`);    

    // Bulk insert the agents
    const insertResult = await agentCollection.insertMany(agentProfiles);
    console.log(`Inserted ${insertResult.insertedCount} agents`);

    // Sample tenant
    await db.collection('tenants').insertOne({
      tenantId: 'cypress-resorts',
      apiKey: 'cypress-api-key-123',
      billingPlan: 'pro',
      usage: { calls: 0 },
      createdAt: new Date(),
    });

    const configsToInsert = agentInstructions.map((config, index) => ({ 
      ...config,
    }));

    // Sample Cypress agent config (from your mainAgent; added id, agentId, isActive, customData)
    await db.collection('agentconfigs').insertMany(configsToInsert);

    console.log('DB seeded with Cypress tenant and agent');

  } catch (error) {
    console.error('Error seeding agents:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedAgents().catch(console.error);


