import { isDate, isPlainObject } from './util'
interface URLOrigin {
  protocol: string
  host: string
}
function getUrlQuery(url: string): string[] {
  // 获取?后面的字符串
  let query = decodeURIComponent(url)
    .replace(/.*\?/, '')
    .split('&')
  const hash: any = {}
  for (let q of query) {
    const nv = q.split('=')
    hash[nv[0]] = nv[1]
  }
  return hash
}
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/**
 * 拼接URL
 * @param url 请求的URL
 * @param params 拼接到URL上的参数
 * @returns 拼接好的URL
 */
export function buildURL(url: string, params?: any): string {
  if (!params) return url
  const parts: string[] = []
  /**
   * 考虑一下情况：
   * 1. 已存在的参数要保留。√
   * 2. 丢弃URL中的哈希标志。
   * 3. 空值忽略。 √
   * 4. 特殊字符不用encode。@、:、$、[、]、,、空值（空值变+）。 √
   * 5. Date类型需要使用date.toISOString()格式化 √
   * 6. 参数值为对象。√
   * 7. 参数为数组。√
   */
  // URLSearchParams 只能解析?问号后面的，如果问号前面还有路径是解析不出来的。
  let searchParams = new URLSearchParams(url.replace(/.*?\?/, ''))
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || val === undefined || searchParams.has(key)) return
    let values = []
    if (Array.isArray(val)) {
      values = val
      key = key + '[]'
    } else {
      values = [val]
    }
    values.forEach(v => {
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isPlainObject(v)) {
        v = JSON.stringify(v)
      }
      parts.push(`${encode(key)}=${encode(v)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (!serializedParams) return url
  let markIndex = url.indexOf('#')
  if (markIndex > -1) url = url.slice(0, markIndex)
  url = url + (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  return url
}
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
export function isURLSameOrigin(requestURL: string): boolean {
  const targetOrigin = resolveURL(requestURL)
  return (
    targetOrigin.protocol === currentOrigin.protocol && targetOrigin.host === currentOrigin.host
  )
}

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}
