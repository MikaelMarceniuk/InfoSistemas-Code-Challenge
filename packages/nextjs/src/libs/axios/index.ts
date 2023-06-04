import axios, { AxiosInstance } from "axios"

class Axios {
  static instance: AxiosInstance

  constructor() {}

  public getInstance() {
    if (!Axios.instance)
      Axios.instance = axios.create({
        baseURL: "http://localhost:3001",
        timeout: 1000 * 10, // 10 Seg
      })

    return Axios.instance
  }
}

export default Axios
