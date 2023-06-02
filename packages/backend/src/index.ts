import Server from "./server"
;(async () => {
  await Server.initialize()

  Server.app.listen(process.env.PORT, () =>
    console.log(`Backend is running at port ${process.env.PORT}`)
  )
})()
