import axios from '../../src/index'

// localhost和127.0.0.1确实会跨域
axios({
    method: 'get',
    url: 'http://127.0.0.1:8080/base/get',
    params: {
        foo: ['bar', 'baz']
    }
})

axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: {
            bar: 'baz'
        }
    }
})

const date = new Date()

axios({
    method: 'get',
    url: '/base/get',
    params: {
        date
    }
})

axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: '@:$, '
    }
})

axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: 'bar',
        baz: null
    }
})

axios({
    method: 'get',
    url: '/base/get#hash',
    params: {
        foo: 'bar'
    }
})

axios({
    method: 'get',
    url: '/base/get?foo=bar',
    params: {
        bar: 'baz'
    }
})


axios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2
    }
})

axios({
    method: 'post',
    url: '/base/post',
    headers: {
        'content-type': 'application/json;',
        'Accept': 'application/json,text/plain,*/*'
    },
    data: {
        a: 1,
        b: 2
    }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'

const searchParams = new URLSearchParams(paramsString)

axios({
    method: 'post',
    url: '/base/post',
    data: searchParams
})