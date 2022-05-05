import { AxiosError } from '../../src/helpers/error'
import axios from '../../src/index'

axios.get('/validate/get').then(res => {
    console.log("success")
    console.log(res)
}).catch((e: AxiosError) => {
    console.log("Failed")
    console.log(e.message)
})
axios.get('/validate/get', {
    validateStatus: function (status: number) {
        return status >= 200 && status < 400
    }
}).then(res => {
    console.log("success")
    console.log(res)
}).catch((e: AxiosError) => {
    console.log("Failed")
    console.log(e.message)
})