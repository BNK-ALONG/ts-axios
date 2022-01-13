import { isPlainObject } from './util'

/**
 * 处理请求头
 * @param headers 请求头
 * @param data 请求体
 */
export function processHeaders(headers: any, data: any): any {
  let ct = 'Content-Type'
  normalizeHeaderName(headers, ct)
  if (isPlainObject(data) && !headers[ct]) {
    headers[ct] = 'application/json;charset=utf-8'
  }
  return headers
}
/**
 * 规范化请求头的属性
 * @param headers 请求头
 * @param normalizeName 需要规范化的属性
 * @returns
 */
function normalizeHeaderName(headers: any, normalizeName: stirng): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    // 规范已经存在的且忽略大小写时相等的name
    if (name.toUpperCase() === normalizeName.toUpperCase() && name !== normalizeName) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}
