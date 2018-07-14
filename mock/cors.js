const {enabled} = require('./token-service')

function tokenHeader () {
  if (enabled) return ',X-Token'
  return ''
}

module.exports = function (req, res, next) {
  const origin = req.headers.origin
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Headers', 'Content-Type' + tokenHeader())
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method.toUpperCase() === 'OPTIONS') {
    res.status(200).end()
    return
  }
  next()
}
