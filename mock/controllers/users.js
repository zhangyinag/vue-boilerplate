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
    const {username} = req.query
    const params = username ? {username} : undefined
    return this.collection.find(params)
  }

  @Mapping({url: '/users/:username', method: 'delete'})
  deleteUser (req, res) {
    const username = req.params.username
    if (!username) throw new RespError('004', `can not delete user of [${username}]`)
    let user = this.collection.find({username})[0]
    if (!user) throw new RespError('004', `can not find user of [${username}]`)
    this.collection.remove(user)
  }

  @Mapping({url: '/users/:username', method: 'put'})
  putUsers (req, res) {
    let username = req.params.username
    if (!username) throw new RespError('004', 'params error, username required')
    let user = this.collection.find({username})[0]
    if (!user) throw new RespError('500', `not found user [${username}]`)
    Object.assign(user, req.body)
    this.collection.update(user)
    return user
  }

  @Mapping({url: '/users/like/username', method: 'get'})
  async queryUsersLikeUsername (req, res) {
    const {username} = req.query
    const all = this.collection.find()
    let result = all.filter(v => {
      return v && (v.username || '').startsWith(username)
    })
    await new Promise((resolve, reject) => {
      let delay = Math.floor(Math.random() * 10000)
      setTimeout(resolve, delay)
    })
    return result
  }
}
