import { Db, MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"

let singleton: Db
let inMemoryDb: MongoMemoryServer

const createMongoConnString = async () => {
  if (process.env.NODE_ENV == "test") {
    if (!inMemoryDb) inMemoryDb = await MongoMemoryServer.create()

    return inMemoryDb.getUri()
  }

  return `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}`
}

const connectToDb = async () => {
  if (singleton) return singleton

  const client = new MongoClient(await createMongoConnString())

  const maxTry = 3
  let currentTry = 1

  for (currentTry; currentTry <= maxTry; currentTry++) {
    try {
      console.log(`Trying to connect to MongoDb. Current try: ${currentTry}`)

      await client.connect()

      console.log("Succefully connected to MongoDb")
      break
    } catch (e) {
      if (currentTry == maxTry)
        throw new Error(`Error in connecting to Mongodb: ${e.message}`)
    }
  }

  singleton = client.db(process.env.MONGO_DB_DATABASE)
  return singleton
}

export default connectToDb
