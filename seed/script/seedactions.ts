//////////////////////////////////////////////////
// collect key info for all components         ////
//   assemble actions that agents can take     ///
//////////////////////////////////////////////////

/*
    NOTICE - IF ENABLED===FALSE THE ACTION DOES NOT LOAD
*/
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { actions } from '../data/actions/index.js';
import { amenities} from '../data/amenities/index.js';

const uri = process.env.DB || '';
const DB_NAME = 'strategic_machines';

async function seedActions() {
  const client = new MongoClient(uri);

  if (!uri || !DB_NAME) {
      console.log({ error: 'Missing database configuration' }, { status: 500 });
      return
  }
   console.log('Connected to MongoDB');
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(DB_NAME);
    const actionCollection = db.collection('actions');   
    const deleteActions = await actionCollection.deleteMany({});
    console.log(`Dropped ${deleteActions.deletedCount} http tool descriptors`);
   
    const thingsCollection = db.collection('amenities');       
    const deleteThings = await thingsCollection.deleteMany({});
    console.log(`Dropped ${deleteThings.deletedCount} amenities`); 
    
    // filter out any actions where the enable = false
    const actionsEnabled = actions.filter(a=>a.enabled)
    // Bulk insert
    const insertResult = await actionCollection.insertMany(actionsEnabled);
    console.log(`Inserted ${insertResult.insertedCount} actions`); 
    const insertThings = await thingsCollection.insertMany(amenities);
    console.log(`Inserted ${insertThings.insertedCount} amenities`);    

  } catch (error) {
    console.error('Error seeding actions:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedActions().catch(console.error);


