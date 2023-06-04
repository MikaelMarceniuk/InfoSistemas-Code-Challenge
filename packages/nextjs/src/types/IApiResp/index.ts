interface IApiResp<T> {
  isSuccess: boolean
  data?: T
}

export default IApiResp
