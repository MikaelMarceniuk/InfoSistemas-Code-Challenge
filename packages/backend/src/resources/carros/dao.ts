import { Collection } from "mongodb"
import { ConnectToMongoDb } from "../../db"

let collection: Collection<Document>
const collectionName = "carros"

const getCollection = async () => {
  if (collection) return collection

  const db = await ConnectToMongoDb()
  collection = db.collection(collectionName)
  return collection
}

export default {
  findAll: async () => {
    const dbCollection = await getCollection()
    return await dbCollection.find({}).toArray()
  },

  create: async (newCarro) => {
    const dbCollection = await getCollection()
    return await dbCollection.insertOne(newCarro)
  },

  update: async (query, newCarro) => {
    const dbCollection = await getCollection()
    return await dbCollection.updateOne(query, newCarro)
  },

  delete: async (query) => {
    const dbCollection = await getCollection()
    return await dbCollection.deleteOne(query)
  },
}
