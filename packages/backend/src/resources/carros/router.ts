import { Application } from "express"
import controller from "./controller"

export default (App: Application) => {
  App.get("/carro", controller.findAll)
  App.post("/carro", controller.create)
  App.put("/carro/:id", controller.update)
  App.delete("/carro/:id", controller.delete)
}
