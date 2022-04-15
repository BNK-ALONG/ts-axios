import { stringify } from "qs";
import axios, { AxiosTransformer } from "../../src";

// axios({
//     transformRequest: [(
//         function (data) {
//             return stringify(data)
//         }
//     ), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//     transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), (
//         function (data) {
//             if (typeof data === 'object') {
//                 data.b = 2
//             }
//             return data
//         }
//     )],
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         a: 1
//     }
// }).then(res => {
//     console.log(res.data)
// })

const instance = axios.create({
    transformRequest: [(
        function (data) {
            return stringify(data)
        }
    ), ...(axios.defaults.transformRequest as AxiosTransformer[])],
    transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), (
        function (data) {
            if (typeof data === 'object') {
                data.b = 2
            }
            return data
        }
    )]
})
instance({
    url: '/extend/post',
    method: 'post',
    data: {
        a: 1
    }
}).then(res => {
    console.log(res.data)
})
