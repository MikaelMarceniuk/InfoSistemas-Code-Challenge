process.env.NODE_ENV = "test"

import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import server from "../../src/server"
import carrosMock from "../mocks/newCarro.json"

let requester: ChaiHttp.Agent

before(async () => {
  await server.initialize()
  chai.use(chaiHttp)
  requester = chai.request(server.app).keepOpen()
})

after(() => requester.close())

describe("Carros CRUD", () => {
  it("Requester should be instantiated", () => {
    expect(requester).to.not.be.undefined
  })

  it("Should create a new Carro", (done) => {
    requester
      .post("/carro")
      .send(carrosMock[0])
      .end((err, res) => {
        expect(res.body).to.have.keys("isSuccess", "data")
        expect(res.body.isSuccess).to.be.equals(true)
        done()
      })
  })

  it("Should retrieve one Carro", (done) => {
    requester.get("/carro").end((err, res) => {
      expect(res.body).to.have.keys("isSuccess", "data")
      expect(res.body.isSuccess).to.be.equals(true)

      const { data } = res.body
      expect(data.length).to.be.equals(1)

      const [{ marca, modelo, ano, renavam, placa, chassi }] = data
      expect(marca).to.be.equals(carrosMock[0].marca)
      expect(modelo).to.be.equals(carrosMock[0].modelo)
      expect(ano).to.be.equals(carrosMock[0].ano)
      expect(renavam).to.be.equals(carrosMock[0].renavam)
      expect(placa).to.be.equals(carrosMock[0].placa)
      expect(chassi).to.be.equals(carrosMock[0].chassi)

      done()
    })
  })

  it("Should update Carro", async () => {
    const newPlaca = "AAA-1111"

    // Gets Carro
    let carroToUpdate
    await new Promise((resolve) => {
      requester
        .get("/carro")
        .then((res) => (carroToUpdate = res.body.data[0]))
        .then(resolve)
    })

    // Updates Carro
    let updateResult
    await new Promise((resolve) => {
      requester
        .put(`/carro/${carroToUpdate._id}`)
        .send({ placa: newPlaca })
        .then((resp) => (updateResult = resp.body))
        .then(resolve)
    })

    expect(updateResult).to.have.keys("isSuccess", "data")
    expect(updateResult.isSuccess).to.be.equals(true)

    const { data } = updateResult
    expect(data.modifiedCount).to.be.equal(1)

    //Check if it was really updated
    let getResult
    await new Promise((resolve) => {
      requester
        .get("/carro")
        .then((res) => (getResult = res.body))
        .then(resolve)
    })

    expect(getResult).to.have.keys("isSuccess", "data")
    expect(getResult.isSuccess).to.be.equals(true)

    const [{ placa }] = getResult.data
    expect(placa).to.be.equal(newPlaca)
  })

  it("Should delete Carro", async () => {
    // Gets Carro
    let carroToDelete
    await new Promise((resolve) => {
      requester
        .get("/carro")
        .then((res) => (carroToDelete = res.body.data[0]))
        .then(resolve)
    })

    // Deletes carro
    let deleteResult
    await new Promise((resolve) => {
      requester
        .delete(`/carro/${carroToDelete._id}`)
        .then((res) => (deleteResult = res.body))
        .then(resolve)
    })

    expect(deleteResult).to.have.keys("isSuccess", "data")
    expect(deleteResult.isSuccess).to.be.equals(true)

    const { deletedCount } = deleteResult.data
    expect(deletedCount).to.be.equal(1)

    //Check if it was really updated
    let getResult
    await new Promise((resolve) => {
      requester
        .get("/carro")
        .then((res) => (getResult = res.body))
        .then(resolve)
    })

    expect(getResult.data.length).to.be.equal(0)
  })

  it("Should create 4 Carros", async () => {
    // Creates Carro
    for (let i = 0; i < carrosMock.length; i++) {
      await new Promise((resolve) => {
        requester.post("/carro").send(carrosMock[i]).then(resolve)
      })
    }

    // Check if was created 4 carros
    let getResult
    await new Promise((resolve) => {
      requester
        .get("/carro")
        .then((res) => (getResult = res.body))
        .then(resolve)
    })

    expect(getResult.isSuccess).to.be.true
    expect(getResult.data.length).to.be.equal(4)
  })
})
