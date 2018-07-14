const tree = [
  {
    pid: 'home',
    name: '首页',
    description: null,
    configurable: true,
    children: [
      {
        pid: 'dashboard',
        name: 'Dashboard',
        description: null,
        configurable: true
      },
      {
        pid: 'user',
        name: 'user',
        description: null,
        configurable: true
      }
    ]
  }
]

function toArray () {
  const list = []
  tree.forEach(v => {
    convert(v)
  })
  return list
  function convert (obj) {
    if (!obj._pid) {
      obj._pid = obj.pid
      list.push({
        pid: obj._pid,
        name: obj.name,
        description: obj.description,
        configurable: obj.configurable,
        parentPid: null
      })
    }
    let array = obj && obj.children
    if (!Array.isArray(array) || array.length < 1) return
    array.forEach(v => {
      v._pid = (obj._pid ? (obj._pid + '.') : '') + v.pid
      list.push({
        pid: v._pid,
        name: v.name,
        description: v.description,
        configurable: v.configurable,
        parentPid: obj.pid || null
      })
      if (Array.isArray(v.children) && v.children.length > 0) {
        v.children.forEach(w => {
          convert(w)
        })
      }
    })
  }
}

module.exports = toArray()
