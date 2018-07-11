const whiteList = '/login,/logout,/test,/_session'
function onWhiteList (url) {
  return whiteList.split(',').some(v => url.startsWith(v))
}

module.exports = function (req, res, next) {
  if (onWhiteList(req.url)) return next()
  if (!req.session.user) {
    res.status(401).end()
    return
  }
  next()
}
