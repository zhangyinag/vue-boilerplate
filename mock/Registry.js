const colors = require('colors')

const registry = []

const cache = {}

function exist (url, method) {
  let obj = cache[url]
  if (obj && (obj[method] || obj['all'])) return true
}

module.exports = {
  register: function ({url, method, handler}) {
    if (!url) throw new Error('register route fail, url required')
    if (!handler) throw new Error('register route fail, handler required')
    if (!method) method = 'all'
    method = method.toLowerCase()
    if (exist(url, method)) throw new Error(`route url [${url}], method [${method}] already registered`);
    (cache[url] || (cache[url] = {}))[method] = true
    registry.push({url, method, handler})
    console.info(`registry: url [${url}], method [${method}]`.blue)
  },
  get () {
    return registry
  }
}
