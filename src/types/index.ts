export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'
  | 'connect'
  | 'CONNECT'
  | 'trace'
  | 'TRACE'
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any // 服务端返回的数据
  status: number // HTTP状态码
  statusText: string // 状态消息
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置对象
  request: any // XMLHttpRequest 对象实例request
}

// 这里的泛型是什么意思？泛型变量
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 我们希望对外提供的错误信息不仅仅包含错误文本，还有config,request实例,response,错误码code
export interface AxiosError extends Error {
  code?: number | null
  config: AxiosRequestConfig
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
