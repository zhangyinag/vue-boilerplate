const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

const {tokenStorage, enabled} = require('../token-service')

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
    if (enabled) {
      let token = username + '-' + Date.now()
      tokenStorage[username] = token
      return token
    }
    return null
  }

  @Mapping({url: '/logout', method: 'post'})
  logout (req, res) {
    let username = req.session && req.session.user && req.session.user.username
    if (username) delete tokenStorage[username]
    req.session.destroy()
  }

  @Mapping({url: '/auth', method: 'get'})
  getAuth (req, res) {
    return req.session.user || null
  }

  @Mapping({url: '/auth/acl', method: 'get'})
  getAcl (req, res) {
    let roles
    if (!req.session.user) { // 匿名用户
      roles = ['ROLE_ANONYMOUS']
    } else {
      roles = req.session && req.session.user && req.session.user.roles
    }
    if (!Array.isArray(roles) || roles.length < 1) return []
    const acl = []
    roles.forEach(role => {
      acl.push(...this.getCollection('acl_entries').find({sid: role}).map(v => v.pid))
    })
    return acl
  }

  @Mapping({url: '/users', method: 'get'})
  getUsers (req, res) {
    const params = req.params || {}
    return this.collection.find(params)
  }
}
