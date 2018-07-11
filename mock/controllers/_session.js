const Controller = require('../Controller')
const Mapping = require('../Mapping')
const RespError = require('../RespError')

module.exports = class _session extends Controller {
  @Mapping('/_session/collections')
  getCollectionNames () {
    return this.db.collections.map(v => v.name)
  }
  @Mapping('/_session/collection')
  getCollectionData (req, res) {
    let name = req.query.name
    let collection = this.db.collections.find(v => v.name === name)
    if (!collection) throw new Error(`not found collection [${name}]`)
    return collection.find()
  }

  @Mapping({url :'/_session/exec', method: 'post'})
  exec (req, res) {
    let expr = req.body.expr
    /* eslint-disable no-eval */
    return eval(expr)
  }
}
