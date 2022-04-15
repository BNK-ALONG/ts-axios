import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    // common是所有方法都会有配置
    common: {
      Accpet: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any) {
      // any 类型的缺点就是只有在运行时才知道是什么类型
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any, headers: any): any {
      return transformResponse(data)
    }
  ]
}
const methodNoData = ['get', 'delete', 'head', 'options']
methodNoData.forEach(method => {
  // 空对象，提供用户可以修改某一方法
  defaults.headers[method] = {}
})
const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default defaults
