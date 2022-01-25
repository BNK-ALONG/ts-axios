import { AxiosRequestConfig, AxiosResponse } from '../types'
// AxiosError继承了Error类，添加了自己的一些属性
export class AxiosError extends Error {
  code?: number | null
  config: AxiosRequestConfig
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
  // 可选参数必须在必选参数的后面
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: number,
    request?: any,
    response?: AxiosResponse
  ) {
    // 子类（派生类）必须包含super()函数
    super(message) // message这是传给Error的
    this.code = code
    this.config = config
    this.request = request
    this.response = response
    this.isAxiosError = true
    // TS官网关于继承一些内置对象的坑
    // https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: number | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
