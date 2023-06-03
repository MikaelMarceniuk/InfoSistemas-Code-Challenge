import { EAvaliableCollections, getCollection } from "../../db"

export default {
  findAll: async () => {
    const dbCollection = await getCollection(EAvaliableCollections.carros)
    return await dbCollection.find({}).toArray()
  },

  create: async (newCarro) => {
    const dbCollection = await getCollection(EAvaliableCollections.carros)
    return await dbCollection.insertOne(newCarro)
  },

  update: async (query, newCarro) => {
    const dbCollection = await getCollection(EAvaliableCollections.carros)
    return await dbCollection.updateOne(query, newCarro)
  },

  delete: async (query) => {
    const dbCollection = await getCollection(EAvaliableCollections.carros)
    return await dbCollection.deleteOne(query)
  },
}
