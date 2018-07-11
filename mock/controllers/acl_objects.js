/* eslint-disable camelcase */
const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

module.exports = class acl_objects extends Controller {
  @Mapping({url: '/acl_objects', method: 'get'})
  getAclObjects (req, res) {
    return this.collection.find()
  }
}
