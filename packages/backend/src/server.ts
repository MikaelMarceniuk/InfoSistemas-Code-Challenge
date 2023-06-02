import "dotenv/config"
import express, { Express } from "express"
import morgan from "morgan"

class Server {
  app: Express
  isConnectedToDb: boolean

  constructor() {
    this.app = express()
    this.app.use(morgan("dev"))
    this.loadRoutes()
    ;(async () => await this.connectToDb())()
  }

  loadRoutes() {
    this.app.get("/api", (req, res) => res.send({ message: "Hello World!" }))
  }

  async connectToDb() {
    const { ConnectToMongoDb } = require("./db")

    await ConnectToMongoDb()

    this.isConnectedToDb = true
  }
}

export default new Server().app
