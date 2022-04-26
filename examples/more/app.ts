import axios from "../../src"

document.cookie = "a=b"
axios.get('/more/get').then(res => {
    // console.log(res)
})

// 必须请求的是localhost，如果是127.0.0.1，会有跨域，即使带上withCredentials:true也不管用
axios.post('http://localhost:8088/more/server2', {}, {
    withCredentials: true
}).then(res => {
    console.log(res)
})