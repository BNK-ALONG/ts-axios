import { AxiosInstance } from '.'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  // 这是实例的属性，目的是可以这样使用axios.get(url,config)
  const context = new Axios()
  // 这是原型的属性，目的是可以直接new axios(config)，把axios当成一个函数
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()
export default axios
