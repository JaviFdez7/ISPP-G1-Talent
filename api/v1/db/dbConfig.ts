import mongoose from 'mongoose';
import { getAllUser, getUserById, createUser, updateUser, deleteUser, loginUser } from '../modules/user/services/UserService'
import { CandidateSubscription } from '../modules/user/models/user'

export async function connectToMongoDB() {
  const mongoUrl = 'mongodb://localhost:27017';
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

    // This commented code below tests the user service methods

    // let user = await createUser({ username: 'framonmar6', password: '12345', email: 'framonmar7@alum.us.es', fullName: 'Francisco Montero', githubUser: 'FjMonteroInformatica', githubToken: 'Token de prueba', candidateSubscription: CandidateSubscription.PRO }, 'Candidate')

    // const users = await getAllUser()
    // console.log('All users: ', users)

    // const id = user._id
    // user = await getUserById(id)
    // console.log('User by id: ', user)

    // user = await updateUser(id, { username: 'framonmar7', githubUser: 'FJMonteroInformatica' }, 'Candidate');
    // console.log('Updated user: ', user)

    // user = await loginUser({ username: 'framonmar7', password: '12345' }, 'Candidate')
    // console.log('Logged in user: ', user)

    // console.log(await deleteUser(id, 'Candidate'))

    // The script for populating the database will go here.
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
