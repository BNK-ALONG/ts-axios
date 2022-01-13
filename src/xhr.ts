import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)
  // TODO:
  // 1. 为什么setRequestHeader要放在open后面
  // 2. 常用设置的Headers请求头类型都有哪一些，参考：CRM和SITE项目。

  Object.keys(headers).forEach(name => {
    if (data === null && name.toUpperCase() === 'CONTENT-TYPE') {
      return
    } else {
      xhr.setRequestHeader(name, headers[name])
    }
  })
  xhr.send(data)
}
