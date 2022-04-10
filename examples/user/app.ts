import axios from "../../src"

interface ResponseData<T = any> {
    data: T
    code: number
    msg: string
}
interface User {
    name: string
    age: number
}
function getUser<T>() {
    return axios.get<ResponseData<T>>('/user/info').then(res => res.data).catch(console.log)
}

async function test() {
    let user = await getUser<User>();
    if (user) {
        console.log("user name is:", user.data.name)
    }
}
test()