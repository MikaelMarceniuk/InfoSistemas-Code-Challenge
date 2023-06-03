import { ObjectId } from "mongodb"
import carrosDAO from "./dao"
import { ApiResponse } from "../../utils"

export default {
  findAll: async () => {
    return new ApiResponse(true, await carrosDAO.findAll())
  },

  create: async (newCarro) => {
    const result = await carrosDAO.create(newCarro)

    return new ApiResponse(true, result.insertedId)
  },

  update: async (carroId, body) => {
    const query = { _id: new ObjectId(carroId) }
    const newCarro = {
      $set: { placa: body.placa },
    }

    return new ApiResponse(true, await carrosDAO.update(query, newCarro))
  },

  delete: async (carroId) => {
    const query = { _id: new ObjectId(carroId) }

    return new ApiResponse(true, await carrosDAO.delete(query))
  },
}
