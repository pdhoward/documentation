/////////////////////////////////////////////////////////////
// post agent profiles rednered to Strategic Machines     //
//   website as well as tenant profiles used in enabling //
//     voice agents                                     //
/////////////////////////////////////////////////////////
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { agentProfiles } from '../data/agentwebdemo/index.js';
import { tenantProfiles } from '../data/tenants/index.js';

const gradients = [
  "bg-gradient-to-br from-blue-500 to-purple-600",
  "bg-gradient-to-br from-red-500 to-orange-600",
  "bg-gradient-to-br from-yellow-500 to-red-600",
  "bg-gradient-to-br from-green-500 to-teal-600",
];

const uri = process.env.DB || '';
const DB_NAME = 'website';

async function seedAgents() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);
    const agentCollection = db.collection('agents');
    const tenantCollection = db.collection('tenants');

    // Clear existing documents in the collection
    const deleteAgents = await agentCollection.deleteMany({});
    console.log(`Dropped ${deleteAgents.deletedCount} agents`);
     // Clear existing documents in the collection
    const deleteTenants = await tenantCollection.deleteMany({});
    console.log(`Dropped ${deleteTenants.deletedCount} tenants`);

    // Add unique id to each agent if not present (using lowercase name as id for simplicity)
    const agentsWithId = agentProfiles.map(agent => ({
      ...agent,
      id: agent.name.toLowerCase().replace(/\s+/g, '-'), // Generate a simple unique id based on name
    }));

    // Bulk insert the agents
    const insertResult = await agentCollection.insertMany(agentsWithId);
    console.log(`Inserted ${insertResult.insertedCount} agents`);
      // Bulk insert the tenants
    const insertTenantResult = await tenantCollection.insertMany(tenantProfiles);
    console.log(`Inserted ${insertTenantResult.insertedCount} tenants`);

  } catch (error) {
    console.error('Error seeding agents:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedAgents().catch(console.error);


