import axios from '../../src/index'

axios.post('/auth/post', {
    test: 'hello world'
}, {
    auth: {
        username: 'John',
        password: '123'
    }
}).then(res => {
    console.log("success!", res)
}, error => {
    console.log("error!", error)
})