import "dotenv/config"
import "reflect-metadata"
import express, { Express } from "express"
import morgan from "morgan"

class Server {
  app: Express

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
    const { ConnectToMongoDb, ConnectToPostgresDb } = require("./db")

    await ConnectToMongoDb()
    await ConnectToPostgresDb()
  }
}

export default new Server().app
