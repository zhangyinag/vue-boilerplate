/* eslint-disable no-path-concat */
const db = require('./db')
const requireAll = require('require-all')
const inits = requireAll({
  dirname: __dirname + '/inits',
  recursive: false
})

let cache = {}

class Controller {
  constructor (collectionName) {
    if (!collectionName) throw new Error('collection name required')
    if (cache[collectionName]) throw new Error(`already exist collection name [${collectionName}]`)
    cache[collectionName] = true
    this.db = db
    this.collection = db.addCollection(collectionName)
    this.init()
  }
  init () {
    let data = inits[this.collection.name]
    if (data && Array.isArray(data)) {
      data.forEach(v => this.collection.insert(v))
    }
  }
  getCollection (collectionName) {
    return this.db.collections.find(collection => collection.name === collectionName)
  }
}

module.exports = Controller
