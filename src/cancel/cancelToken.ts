import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
// 为什么是使用Cancel类而不是接口？类既可以作为类型，也可以作为值传入，而接口不能当做值使用（底下有new Cancel())
import Cancel from './cancel'

interface ResolvedPromise {
  (reason?: Cancel): void
}
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  private cancelled: boolean
  constructor(executor: CancelExecutor) {
    let resolvedPromise: ResolvedPromise
    this.cancelled = false

    this.promise = new Promise<Cancel>(resolved => {
      resolvedPromise = resolved
    })
    // 把这个c=>()函数传到外面去
    executor(message => {
      if (this.cancelled) return
      this.cancelled = true
      this.reason = new Cancel(message)
      resolvedPromise(this.reason)
    })
  }
  throwIfRequested(): void {
    if (this.cancelled) {
      throw this.reason
    }
  }
  static source(): CancelTokenSource {
    let cancel: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
