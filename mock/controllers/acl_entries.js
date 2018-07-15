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
}
