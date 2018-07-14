const colors = require('colors')

module.exports = function (req, res, next) {
  const from = req.headers.host
  const url = req.url
  const method = req.method
  const query = req.query
  const body = req.body

  console.group(`request: ${new Date()}`.green)
  console.info(`from: ${from}`.green)
  console.info(`url: ${url}`.green)
  console.info(`method: ${method}`.green)
  if (query) console.log('query: '.green, query)
  if (body) console.log('body: '.green, body)
  console.log('\n')
  console.groupEnd()
  next()
}
