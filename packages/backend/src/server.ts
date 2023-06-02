import express, { Express } from "express"
import morgan from "morgan"
import "dotenv/config"

class Server {
  app: Express

  constructor() {
    this.app = express()
    this.loadRoutes()
    morgan("dev")
  }

  loadRoutes() {
    this.app.get("/api", (req, res) => res.send({ message: "Hello World!" }))
  }
}

export default new Server().app
