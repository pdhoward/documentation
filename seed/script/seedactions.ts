//////////////////////////////////////////////////
// collect key info for all components         ////
//   assemble actions that agents can take     ///
//////////////////////////////////////////////////

/*
    NOTICE - IF ENABLED===FALSE THE ACTION DOES NOT LOAD
*/
import 'dotenv/config';
import { actions } from '../data/actions/index.js';
import { things } from '../data/things/index.js';

import getMongoConnection from '../../src/db/connections/index.js'; // Adjust path if needed (based on your connects/index.js)

async function seedActions() {
  const url = process.env.DB; 
  const dbName = process.env.MAINDBNAME; 

  if (!url || !dbName) {
      console.log({ error: 'Missing database configuration' }, { status: 500 });
      return
  }
  
  const { client, db } = await getMongoConnection(url, dbName);

   console.log('Connected to MongoDB');

  try {
    // Check and drop collections if they exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (collectionNames.includes('actions')) {
      await db.collection('actions').drop();
      console.log('Dropped actions collection');
    }
    if (collectionNames.includes('things')) {
      await db.collection('things').drop();
      console.log('Dropped things collection');
    }
    
    const actionsCollection = db.collection('actions');
    const thingsCollection = db.collection('things');

    // Clear existing documents in the collection
    const deleteResult = await actionsCollection.deleteMany({});
    console.log(`Dropped ${deleteResult.deletedCount} actions`);    
    const deleteThings = await actionsCollection.deleteMany({});
    console.log(`Dropped ${deleteThings.deletedCount} things`); 
    
    // filter out any actions where the enable = false
    const actionsEnabled = actions.filter(a=>a.enabled)
    // Bulk insert
    const insertResult = await actionsCollection.insertMany(actionsEnabled);
    console.log(`Inserted ${insertResult.insertedCount} actions`); 
    const insertThings = await thingsCollection.insertMany(things);
    console.log(`Inserted ${insertThings.insertedCount} things`);    

  } catch (error) {
    console.error('Error seeding actions:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedActions().catch(console.error);


