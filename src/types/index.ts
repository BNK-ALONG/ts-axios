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
}
