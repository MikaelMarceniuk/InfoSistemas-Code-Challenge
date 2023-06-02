import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
})

const connectToDb = async () => {
  const maxTry = 3
  let currentTry = 1

  for (currentTry; currentTry <= maxTry; currentTry++) {
    try {
      console.log(`Trying to connect to Postgres. Current try: ${currentTry}`)

      await AppDataSource.initialize()

      console.log("Succefully connected to Postgres")
      break
    } catch (e) {
      if (currentTry == maxTry)
        throw new Error(`Error in connecting to Postgres: ${e.message}`)
    }
  }
}

export default connectToDb
