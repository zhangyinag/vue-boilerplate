const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

const tokenStorage = {}

module.exports = class users extends Controller {
  @Mapping({url: '/login', method: 'post'})
  login (req, res) {
    let username = req.body.username
    if (!username) throw new RespError('001', '用户名不能为空', null)
    let user = this.collection.find({username})[0]
    if (!user) throw new RespError('002', `不存在该用户：${username}`, null)
    // req.session.regenerate(err => {
    //   console.error(err)
    // })
    req.session.user = user
    let token = username + '-' + Date.now()
    tokenStorage[username] = token
    return token
  }

  @Mapping({url: '/logout', method: 'post'})
  logout (req, res) {
    let username = req.session && req.session.user && req.session.user.username
    if (username) delete tokenStorage[username]
    req.session.destroy()
  }

  @Mapping({url: '/user', method: 'get'})
  getUser (req, res) {
    return req.session.user
  }

  @Mapping({url: '/user/acl', method: 'get'})
  getAcl (req, res) {
    let roles = req.session && req.session.user && req.session.user.roles
    if (!Array.isArray(roles) || roles.length < 1) return []
    const acl = []
    roles.forEach(role => {
      acl.push(...this.getCollection('acl_entries').find({sid: role}).map(v => v.pid))
    })
    return acl
  }
}
