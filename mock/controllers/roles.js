const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

module.exports = class roles extends Controller {
  @Mapping({url: '/roles', method: 'get'})
  getRoles (req, res) {
    return this.collection.find()
  }
}
