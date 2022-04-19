import { flattenHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import transform from './transform'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancel(config)
  processConfig(config)
  return xhr(config).then(response => {
    return transformResponseData(response)
  })
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method)
}
function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url, params)
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancel(config: AxiosRequestConfig): void {
  // 如果已经取消过的请求，再请求就会报错
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
export default axios
