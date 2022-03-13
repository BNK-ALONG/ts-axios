const _toString = Object.prototype.toString
// val is Date 类型保护
export function isDate(val: any): val is Date {
  return _toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any): val is Object {
  return _toString.call(val) === '[object Object]'
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
