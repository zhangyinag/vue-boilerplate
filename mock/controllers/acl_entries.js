/* eslint-disable camelcase */
const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

module.exports = class acl_entries extends Controller {
  @Mapping({url: '/acl_entries', method: 'get'})
  getAclEntries (req, res) {
    let {roleCode} = req.query
    return this.collection.find({sid: roleCode}).map(v => v.pid)
  }

  @Mapping({url: '/acl_entries/:sid/:pid', method: 'post'})
  addAclEntry (req, res) {
    let {sid, pid} = req.params
    if (!sid || !pid) throw new RespError('500', `sid[${sid}] pid[${pid}] required`)
    let entry = this.collection.find({sid, pid})[0]
    if (!entry) this.collection.insert({sid, pid})
    return this.collection.find({sid, pid})[0]
  }

  @Mapping({url: '/acl_entries/:sid/:pid', method: 'delete'})
  delAclEntry (req, res) {
    let {sid, pid} = req.params
    if (!sid || !pid) throw new RespError('500', `sid[${sid}] pid[${pid}] required`)
    let entry = this.collection.find({sid, pid})[0]
    if (entry) this.collection.remove(entry)
  }
}
