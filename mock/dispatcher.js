const Registry = require('./Registry')
const RespError = require('./RespError')
const transformer = require('./transformer')

function invoke (handler, req, res) {
  let result
  try {
    result = handler(req, res)
    if (result instanceof Promise) return result
    return Promise.resolve(result)
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = function dispatcher (app) {
  const routes = Registry.get()
  routes.forEach(({url, method, handler}) => {
    app[method](url, function (req, res) {
      invoke(handler, req, res).then(data => {
        res.send(transformer(data, null, null)).end()
      }).catch(e => {
        if (e instanceof RespError) {
          res.send(transformer(e.data, e.code, e.message)).end()
        } else {
          res.status(500).send(e.stack).end()
          console.error(e)
        }
      })
    })
  })
}
