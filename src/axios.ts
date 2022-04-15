import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './defaults'
import { extend } from './helpers/util'
import { AxiosRequestConfig, AxiosStatic } from './types'

function createInstance(initConfig: AxiosRequestConfig): AxiosStatic {
  // 这是实例的属性，目的是可以这样使用axios.get(url,config)
  const context = new Axios(initConfig)
  // 这是原型的属性，目的是可以直接new axios(config)，把axios当成一个函数
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig): AxiosStatic {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
