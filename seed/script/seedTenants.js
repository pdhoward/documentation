/////////////////////////////////////////////////////////////
// post tenant profiles rendered to Strategic Machines     //
//   website - the registration document for customers    //
///////////////////////////////////////////////////////////
import 'dotenv/config';
import { MongoClient } from 'mongodb';
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
    const tenantCollection = db.collection('tenants');
  
     // Clear existing documents in the collection
    const deleteTenants = await tenantCollection.deleteMany({});
    console.log(`Dropped ${deleteTenants.deletedCount} tenants`);
   
      // Bulk insert the tenants
    const insertTenantResult = await tenantCollection.insertMany(tenantProfiles);
    console.log(`Inserted ${insertTenantResult.insertedCount} tenants`);

  } catch (error) {
    console.error('Error seeding tenants:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedAgents().catch(console.error);


