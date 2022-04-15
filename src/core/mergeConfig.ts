import { deepMerge, isPlainObject, isUndef } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

const strats = Object.create(null)
function defaultStrat(val1: any, val2: any): any {
  return isUndef(val2) ? val1 : val2
}

function fromVal2Strat(val1: any, val2: any): any {
  if (!isUndef(val2)) return val2
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (!isUndef(val2)) {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (!isUndef(val1)) {
    return val1
  }
}
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (isUndef(config2[key])) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2[key])
  }
  return config
}
