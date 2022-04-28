import axios from "../../src"

const instance = axios.create({
    xsrfCookieName: 'XSRF-TOKEN-D',
    xsrfHeaderName: 'X-XSRF-TOKEN-D'
})
instance({
    url: '/more/get'
}).then(res => {
    console.log(res)
})

