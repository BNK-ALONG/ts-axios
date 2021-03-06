const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const multiparty = require('connect-multiparty')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const cookieParser = require('cookie-parser')
const path = require('path')
require('./server2')
const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie('XSRF-TOKEN-D', '4124234kbkjbfsjrn23j4bkbjxjhdf')
    }
  })
)
// 接受上传文件的目录
app.use(
  multiparty({
    uploadDir: path.resolve(__dirname, 'upload-files')
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

// 路由
const router = express.Router()

registerBaseRouter()
registerErrorRouter()
registerSimpleRouter()
registerExtendRouter()
registerUserRouter()
registerInterceptorRouter()
registerDefaultsRouter()
registerCancelRouter()
registerMoreRouter()
registerProgressRouter()
registerAuthRouter()
registerValidateRouter()
function registerSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}
function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })
  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', (req, res) => {
    res.json(req.body)
  })
  router.head('/extend/head', (req, res) => {
    res.json(req.body)
  })
  router.options('/extend/options', (req, res) => {
    res.json(req.body)
  })
  router.delete('/extend/delete', (req, res) => {
    res.json(req.body)
  })
  router.post('/extend/post', (req, res) => {
    res.json(req.body)
  })
  router.put('/extend/put', (req, res) => {
    res.json(req.body)
  })
  router.patch('/extend/patch', (req, res) => {
    res.json(req.body)
  })
}

function registerUserRouter() {
  router.get('/user/info', function(req, res) {
    res.json({
      code: 0,
      msg: 'success',
      data: {
        name: 'John',
        age: 25
      }
    })
  })
}
function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}
function registerDefaultsRouter() {
  router.post('/defaults/post', function(req, res) {
    res.json(req.body)
  })
}
function registerCancelRouter() {
  router.get('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    setTimeout(() => {
      res.json(req.body)
    })
  })
}
function registerMoreRouter() {
  router.get('/more/get', function(req, res) {
    res.json(req.cookies)
  })
}
function registerProgressRouter() {
  router.post('/progress/upload', function(req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
  })
}
function registerAuthRouter() {
  router.post('/auth/post', function(req, res) {
    const auth = req.headers.authorization
    const [type, user] = auth.split(' ')
    const [username, password] = atob(user).split(':')
    if (type === 'Basic' && username === 'John' && password === '123') {
      res.json(req.body)
    } else {
      res.status(401)
      res.end('UnAuthorization')
    }
  })
}
function registerValidateRouter() {
  router.get('/validate/get', function(req, res) {
    res.status(304)
    res.end()
  })
}
app.use(router)
