import { ObjectId } from "mongodb"
import carrosDAO from "./dao"

export default {
  findAll: async () => {
    return { isSuccess: true, data: await carrosDAO.findAll() }
  },

  create: async (newCarro) => {
    const result = await carrosDAO.create(newCarro)

    return { isSuccess: true, data: result.insertedId }
  },

  update: async (carroId, body) => {
    const query = { _id: new ObjectId(carroId) }
    const newCarro = {
      $set: { placa: body.placa },
    }

    return { isSuccess: true, data: await carrosDAO.update(query, newCarro) }
  },

  delete: async (carroId) => {
    const query = { _id: new ObjectId(carroId) }

    return { isSuccess: true, data: await carrosDAO.delete(query) }
  },
}
