import { Axios } from "../../libs"
import { IApiResp, ICarro } from "../../types"

const axios = new Axios().getInstance()

export const getAllCarros = async () => {
  const { data } = await axios.get<IApiResp<ICarro[]>>("/carro")
  return data
}

export const createCarro = async (values: ICarro) => {
  delete values._id

  const keysMissing = Object.keys(values).filter((k) => !values[k])
  if (keysMissing.length > 0)
    return {
      isSuccess: false,
      data: `Os campos ${keysMissing.join(", ")} nao podem estar vazios`,
    }

  return (await axios.post<IApiResp<string>>("/carro", values)).data
}

export const updateCarro = async (values: ICarro) => {
  const keysMissing = Object.keys(values).filter((k) => !values[k])
  if (keysMissing.length > 0)
    return {
      isSuccess: false,
      data: `Os campos ${keysMissing.join(", ")} nao podem estar vazios`,
    }

  return (
    await axios.put<IApiResp<undefined>>(`/carro/${values._id}`, {
      placa: values.placa,
    })
  ).data
}

export const deleteCarro = async (carroId: string) => {
  return (await axios.delete<IApiResp<undefined>>(`/carro/${carroId}`)).data
}
