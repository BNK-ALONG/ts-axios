import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '..'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.open(method.toUpperCase(), url, true)
    // TODO:
    // 1. 为什么setRequestHeader要放在open后面
    // 2. 常用设置的Headers请求头类型都有哪一些，参考：CRM和SITE项目。
    xhr.onreadystatechange = function handleLoad() {
      // TODO:readState都有哪些值
      if (xhr.readyState !== 4) {
        return
      }
      /**
       * status的值
       *
       * UNSENT（未发送） 0
       * OPENED（已打开） 0
       * LOADING（载入中） 200
       * DONE（完成） 200
       */
      if (xhr.status === 0) {
        return
      }
      const requestHeaders = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType === 'text' ? xhr.responseText : xhr.response
      const response: AxiosResponse = {
        data: responseData,
        config,
        headers: requestHeaders,
        request: xhr,
        status: xhr.status,
        statusText: xhr.statusText
      }
      handleResponse(response)
    }
    function handleResponse(res: AxiosResponse): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        reject(createError(`Request failed with status code ${res.status}`, config, null, xhr, res))
      }
    }
    // 请求默认的超时时间是0,即永不超时
    xhr.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, null, xhr))
    }
    // 只有网络层出问题，才会触发这个回调
    xhr.onerror = function handleError() {
      reject(createError(`Network Error`, config, null, xhr))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === 'CONTENT-TYPE') {
        return
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })
    if (config.cancelToken) {
      config.cancelToken.promise.then(reason => {
        xhr.abort()
        reject(reason)
      })
    }
    xhr.send(data)
  })
}
