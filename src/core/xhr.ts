import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '..'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    // 1. 第一步，先声明一个xhr对象
    const xhr = new XMLHttpRequest()
    // 2. 第二步，打开连接
    xhr.open(method.toUpperCase(), url, true)
    // 3. 第三步，给xhr对象增加配置、事件监听器
    configureRequest()
    addEvents()
    processHeaders()
    processCancel()
    // 4. 第四步，发送数据
    xhr.send(data)

    function configureRequest(): void {
      if (responseType) {
        xhr.responseType = responseType
      }
      if (timeout) {
        xhr.timeout = timeout
      }
      if (withCredentials) {
        xhr.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      if (onDownloadProgress) {
        xhr.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        xhr.upload.onprogress = onUploadProgress
      }
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

      // 请求默认的超时时间是0,即永不超时
      xhr.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, null, xhr))
      }
      // 只有网络层出问题，才会触发这个回调
      xhr.onerror = function handleError() {
        reject(createError(`Network Error`, config, null, xhr))
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
        delete headers['content-type']
        delete headers['CONTENT-TYPE']
      }
      if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
        const token = cookie.read(xsrfCookieName)
        if (token) {
          headers[xsrfHeaderName] = token
        }
      }
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
      Object.keys(headers).forEach(name => {
        if (data === null && name.toUpperCase() === 'CONTENT-TYPE') {
          return
        } else {
          xhr.setRequestHeader(name, headers[name])
        }
      })
    }
    function processCancel(): void {
      if (config.cancelToken) {
        config.cancelToken.promise.then(reason => {
          xhr.abort()
          reject(reason)
        })
      }
    }
    function handleResponse(res: AxiosResponse): void {
      if (!validateStatus || validateStatus(res.status)) {
        resolve(res)
      } else {
        reject(createError(`Request failed with status code ${res.status}`, config, null, xhr, res))
      }
    }
  })
}
