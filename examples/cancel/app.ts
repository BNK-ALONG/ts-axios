import axios from '../../src/'
import { Canceler } from '../../src/types'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.get('/cancel/get', {
    cancelToken: source.token
}).catch(function (thrown) {
    if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
    } else {
        // 处理错误
    }
});

setTimeout(() => {
    source.cancel('Operation canceled by the user.'); // 执行完这个之后，上面的get请求promise状态就被rejected了
    setTimeout(() => {
        axios.post('/cancel/post', { a: 1 }, {
            cancelToken: source.token
        }).catch(res => {
            if (axios.isCancel(res)) {
                // 为什么这个先执行？因为；上面的promise是1000ms后才resolved，但是这个post请求promise优先被rejected了
                console.log(res.message)
            }
        })
    }, 100)
}, 100)

// 第二种方式
let cancel: Canceler

axios.get('/cancel/get', {
    cancelToken: new CancelToken(c => {
        cancel = c
    })
}).catch(e => {
    if (axios.isCancel(e)) {
        console.log("Requested canceled")
    }
})
setTimeout(() => {
    cancel()
}, 500)


