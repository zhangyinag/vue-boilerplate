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
        pid: 'system',
        name: '系统管理',
        description: null,
        configurable: true,
        children: [
          {
            pid: 'user',
            name: '用户管理',
            description: null,
            configurable: true
          },
          {
            pid: 'authority',
            name: '权限管理',
            description: null,
            configurable: true
          }
        ]
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
        parentPid: obj._pid || null
      })
      convert(v)
    })
  }
}
module.exports = toArray()
