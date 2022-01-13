const _toString = Object.prototype.toString
// val is Date 类型保护
export function isDate(val: any): val is Date {
  return _toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return _toString.call(val) === '[object Object]'
}
