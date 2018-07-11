const Registry = require('./Registry')
const Controller = require('./Controller')

const storage = {}

function getInst (clazz) {
  let collectionName = resolveCollectionName()
  let inst = storage[collectionName]
  if (inst) {
    if (inst instanceof clazz.constructor) return inst
    throw new Error(`duplicate collection name [${collectionName}]`)
  }
  inst = new clazz.constructor(collectionName)
  storage[collectionName] = inst
  return inst
  // take class name as collection name
  function resolveCollectionName () {
    return clazz.constructor.name
  }
}

module.exports = function Mapping (options) {
  return function (target, name, descriptor) {
    if (!(target instanceof Controller)) return
    let inst = getInst(target)
    if (!options) throw new Error('url required')
    let url, method
    if (typeof options === 'string') url = options
    else {
      url = options.url
      method = options.method
    }
    Registry.register({
      url: url,
      method: method,
      handler: inst[name].bind(inst)
    })
  }
}
