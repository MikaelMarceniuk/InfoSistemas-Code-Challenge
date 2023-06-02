import App from "./server"

App.listen(process.env.PORT, () =>
  console.log(`Backend is running at port ${process.env.PORT}`)
)
