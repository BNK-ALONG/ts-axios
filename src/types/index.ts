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
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken: CancelToken
  [propName: string]: any // 字符串索引签名
}

export interface AxiosResponse<T = any> {
  data: T // 服务端返回的数据
  status: number // HTTP状态码
  statusText: string // 状态消息
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置对象
  request: any // XMLHttpRequest 对象实例request
}

// 这里的泛型是什么意思？泛型变量
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// 我们希望对外提供的错误信息不仅仅包含错误文本，还有config,request实例,response,错误码code
export interface AxiosError extends Error {
  code?: number | null
  config: AxiosRequestConfig
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

// 这是一个包含axios属性方法的类
export interface Axios {
  defaults: AxiosRequestConfig
  interceptor: {
    request: AxiosInterceptorsManager
    response: AxiosInterceptorsManager
  }
  request: <T = any>(config: AxiosRequestConfig) => AxiosPromise<T>

  get: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>

  delete: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>

  head: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>

  options: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise<T>

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise<T>

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise<T>
}
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic

  Cancel: CancelStatic

  isCancel: (value: any) => boolean
}

export interface AxiosInterceptorsManager {
  use(resolved: ResolvedFn, rejected?: RejectedFn): number
  // forEach 这个函数是内部使用的，不用暴露出去，所以不用写在这个接口里面
  eject(id: number): void
}

// 因为resolve函数的参数是不一定的，请求拦截器的参数是AxiosRequestConfig，而响应拦截器的参数是AxiosResponse，所以这里要用泛型。
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  cancel: Canceler
  token: CancelToken
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}
