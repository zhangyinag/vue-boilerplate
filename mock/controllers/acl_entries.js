/* eslint-disable camelcase */
const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

module.exports = class acl_entries extends Controller {
  @Mapping({url: '/acl_entries', method: 'get'})
  getAclObjects (req, res) {
    return this.collection.find()
  }
}