import "dotenv/config"
import "reflect-metadata"
import express, { Express } from "express"
import morgan from "morgan"

class Server {
  app: Express

  constructor() {}

  async initialize() {
    this.app = express()
    this.loadMiddlewares()
    this.loadRoutes()
    await this.connectToDb()
  }

  loadMiddlewares() {
    this.app.use(morgan("dev"))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
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

export default new Server()
