const {tokenStorage, enabled, tokenKey} = require('./token-service')

const whiteList = '/login,/logout,/test,/_session,/auth,/auth/acl'
function onWhiteList (url) {
  return whiteList.split(',').some(v => url.startsWith(v))
}

function checkToken (req) {
  if (!enabled) return true
  let username = req.session && req.session.user && req.session.user.username
  if (!username) return false
  let clientToken = req.headers[tokenKey]
  if (!clientToken) return false
  let serverToken = tokenStorage[username]
  if (!serverToken) return false
  return simpleCheck(clientToken, serverToken)

  // just check these two token whether identical,
  // if they're not, check fail.
  // you can overwrite this implement more advance future
  function simpleCheck (clientToken, serverToken) {
    return clientToken === serverToken
  }
}

module.exports = function (req, res, next) {
  if (onWhiteList(req.url)) return next()
  if (!req.session.user) {
    res.status(401).send('session expired').end()
    return
  }
  if (!checkToken(req)) {
    res.status(401).send('token check error').end()
    return
  }
  next()
}
