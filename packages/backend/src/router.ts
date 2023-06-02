import userRouter from "./resources/carros/router"
import { Application } from "express"

const routers = [userRouter]

export default (App: Application) => routers.forEach((router) => router(App))
