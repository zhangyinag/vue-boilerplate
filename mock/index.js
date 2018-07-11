require('babel-core/register')
require('require-all')({
// eslint-disable-next-line no-path-concat
  dirname: __dirname + '/controllers',
  recursive: false
})

const Express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dispatcher = require('./dispatcher')
const logger = require('./logger')
const cors = require('./cors')
const auth = require('./auth')

const app = new Express()

app.use(cors)
app.use(cookieParser())
app.use(session({
  secret: 'mock',
  name: 'sid',
  cookie: {maxAge: 30 * 60 * 1000}, // 30 min
  resave: false,
  saveUninitialized: false
}))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(logger)
app.use(auth)

dispatcher(app)

app.listen(3000, function () {
  const host = this.address().address
  const port = this.address().port
  console.log('Mock Server listening at http://%s:%s', host, port)
})
