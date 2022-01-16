import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
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
      const requestHeaders = xhr.getAllResponseHeaders()
      const responseData = responseType === 'text' ? xhr.responseText : xhr.response
      const response: AxiosResponse = {
        data: responseData,
        config,
        headers: requestHeaders,
        request: xhr,
        status: xhr.status,
        statusText: xhr.statusText
      }
      resolve(response)
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === 'CONTENT-TYPE') {
        return
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })
    xhr.send(data)
  })
}
