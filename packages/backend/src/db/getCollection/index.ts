import { connectToDb } from "../index"
import { Collection } from "mongodb"

interface ICollection {
  name: string
  collection: Collection
}

export enum EAvaliableCollections {
  carros = "carros",
}

export const collections: ICollection[] = []

export const getCollection = async (collectionName: EAvaliableCollections) => {
  const collection = collections.find((coll) => coll.name == collectionName)
  if (collection) return collection.collection

  const db = await connectToDb()
  const newConnectedCollection = await db.collection(collectionName)

  collections.push({
    name: collectionName,
    collection: newConnectedCollection,
  })

  return newConnectedCollection
}
