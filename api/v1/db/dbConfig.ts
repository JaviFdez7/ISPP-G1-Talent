import mongoose from 'mongoose';

export async function connectToMongoDB(): Promise<void> {
  const mongoUrl = process.env.MONGO_URL ?? 'mongodb://localhost:27017';
  const dbName = 'talentdb';

  try {
    // Connect to MongoDB
    await mongoose.connect(`${mongoUrl}/${dbName}`);

    console.log('Successful connection to MongoDB');

    const db = mongoose.connection;

    // Check if the database already exists
    const collections = await db.db.collections();
    const dbExists = collections.some((collection) => collection.collectionName === dbName);

    // If the database doesn't exist, create it
    if (!dbExists) {
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`The database ${dbName} already exists`);
    }

    // The script for populating the database will go here.
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  //In TS is usefull to add the return, even if the function return void.
  return;
}
