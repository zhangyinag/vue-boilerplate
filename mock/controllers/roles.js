const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

module.exports = class roles extends Controller {
  @Mapping({url: '/roles', method: 'get'})
  getRoles (req, res) {
    return this.collection.find()
  }

  @Mapping({url: '/roles/', method: 'post'})
  addRole (req, res) {
    let {roleCode, roleName} = req.body
    if (!roleCode || !roleName) throw new RespError('500', `roleCode [${roleCode}] and roleName[${roleName}] required`)
    if (this.collection.find({roleCode, roleName})[0]) throw new RespError('500', `roleCode [${roleCode}] has already exists`)
    this.collection.insert({roleCode, roleName})
    return this.collection.find({roleCode, roleName})[0]
  }

  @Mapping({url: '/roles/:roleCode', method: 'delete'})
  deleteRole (req, res) {
    let roleCode = req.params.roleCode
    if (!roleCode) throw new RespError('500', 'roleCode required')
    let role = this.collection.find({roleCode})[0]
    if (!role) throw new RespError('500', `not found roleCode [${roleCode}]`)
    this.collection.remove(role)
    this.getCollection('acl_entries').remove(this.getCollection('acl_entries').find({sid: roleCode}))
  }

  @Mapping({url: '/roles/:roleCode', method: 'put'})
  putRole (req, res) {
    let {roleCode} = req.params
    let roleName = req.body.roleName
    if (!roleCode || !roleName) throw new RespError('500', `roleCode [${roleCode}] and roleName[${roleName}] required`)
    let role = this.collection.find({roleCode})[0]
    if (!role) throw new RespError('500', `not found coleCode [${roleCode}] .`)
    Object.assign(role, {roleName})
    this.collection.update(role)
    return role
  }
}
