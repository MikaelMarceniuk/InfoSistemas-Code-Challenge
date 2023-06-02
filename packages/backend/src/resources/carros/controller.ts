import carroService from "./service"

export default {
  findAll: async (req, res) => res.json(await carroService.findAll()),

  create: async (req, res) => res.json(await carroService.create(req.body)),

  update: async (req, res) =>
    res.json(await carroService.update(req.params.id, req.body)),

  delete: async (req, res) =>
    res.json(await carroService.delete(req.params.id)),
}
