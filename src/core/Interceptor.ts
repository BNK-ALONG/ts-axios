import { RejectedFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
// 因为有请求拦截器和响应拦截器，所以使用泛型
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolvedFn, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  eject(id: number): void {
    // 为什么等于null，而不是直接删除掉？因为删除掉之后，之前use返回的id顺序就和删掉之后的不一样了。
    this.interceptors[id] = null
  }
  // 向外提供一个可以遍历所有interceptor的函数，因为interceptor是私有的外面是访问不到的，当然也可以直接用一个方法return this.interceptors，但是这样就会向外暴露interceptors的引用，后果不堪设想
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor) {
        fn(interceptor)
      }
    })
  }
}
