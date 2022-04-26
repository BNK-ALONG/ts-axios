const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Headers': 'accpet,content-type',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'X-My-Custom-Header': 'X-My-Custom-Header',
  'Access-Control-Expose-Headers': 'X-My-Custom-Header', // 允许客户端获取的响应头部，如果不设置那么通过xhr.getAllResponseHeaders是获取不到的
  'Access-Control-Max-Age': 3 * 60 // 设置preflight 请求（options请求） 缓存的有效时间，单位：秒
}
router.post('/more/server2', function(req, res) {
  res.set(cors)
  // 把cookie返回给前端
  res.json(req.cookies)
})
router.options('/more/server2', function(req, res) {
  res.set(cors)
  res.end()
})

app.use(router)
const port = process.env.PORT || 8088
module.exports = app.listen(port, () => {
  console.log(`Server2 listening on http://localhost:${port}, Ctrl+C to stop`)
})
