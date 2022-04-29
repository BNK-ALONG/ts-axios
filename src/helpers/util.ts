const _toString = Object.prototype.toString
// val is Date 类型保护
export function isDate(val: any): val is Date {
  return _toString.call(val) === '[object Date]'
}
export function isUndef(val: any): boolean {
  return val === undefined
}
export function isPlainObject(val: any): val is Object {
  return _toString.call(val) === '[object Object]'
}

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}
// 泛型：和any类似，可以是任何类型，但是泛型不会丢失信息
// 泛型变量：就是用<> 括号起来的
// 泛型约束：我们可以用extends 关键词去约束传入的对象必须包含某个属性

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 * 深度合并对象，对于同一路径的同名属性，最后保留的值是靠后对象的值
 * @param objs Object1,Object2,...
 */
export function deepMerge(...objs: any): any {
  let result = Object.create(null)
  objs.forEach(obj => {
    // 用Object.keys，而不是for...in，是因为这里不需要拷贝原型上的属性
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
