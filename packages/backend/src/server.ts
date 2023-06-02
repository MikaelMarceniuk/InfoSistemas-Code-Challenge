import "dotenv/config"
import "reflect-metadata"
import express, { Express } from "express"
import morgan from "morgan"
import router from "./router"

class Server {
  app: Express

  constructor() {}

  async initialize() {
    this.app = express()
    this.loadMiddlewares()
    this.loadRoutes()
    await this.connectToMongoDb()
  }

  loadMiddlewares() {
    this.app.use(morgan("dev"))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  loadRoutes() {
    this.app.get("/api", (req, res) => res.send({ message: "Hello World!" }))
    router(this.app)
  }

  async connectToMongoDb() {
    const { connectToDb } = require("./db")

    await connectToDb()
  }
}

export default new Server()
