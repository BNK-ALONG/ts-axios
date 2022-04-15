import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) return data
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  // 通过数组依次调用函数，并传入同一data，这样就可以实现后面的函数处理前面函数处理完的data
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
