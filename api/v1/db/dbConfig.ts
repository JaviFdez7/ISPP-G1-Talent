import { MongoClient } from 'mongodb'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function connectToMongoDB () {
  const url = 'mongodb://localhost:27017'
  const dbName = 'talentdb'

  const client = new MongoClient(url)

  try {
    await client.connect()

    console.log('Successful connection to MongoDB')

    const db = client.db(dbName)

    const dbExists = await client
      .db()
      .admin()
      .listDatabases({ nameOnly: true })
      .then((dbs) => dbs.databases.map((db) => db.name).includes(dbName))

    if (!dbExists) {
      await db.createCollection('user')
      console.log(`Database ${dbName} created successfully`)
    } else {
      console.log(`The database ${dbName} already exists`)
    }

    // The script for populating the database will go here.
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await client.close()
  }
}
