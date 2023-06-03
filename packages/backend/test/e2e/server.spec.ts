process.env.NODE_ENV = "test"

import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import server from "../../src/server"

before(async () => {
  await server.initialize()
  chai.use(chaiHttp)
})

describe("Default Routes", () => {
  it("/api", (done) => {
    chai
      .request(server.app)
      .get("/api")
      .end((err, res) => {
        expect(res.body).to.have.key("message")
        expect(res.body.message).to.be.equals("Hello World!")
        done()
      })
  })
})
