class ApiResponse {
  isSuccess: boolean
  data: any

  constructor(isSuccess: boolean, data: any) {
    this.isSuccess = isSuccess
    this.data = data
  }
}

export default ApiResponse
