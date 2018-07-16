const Mock = require('mockjs')
const Roles = ['ROLE_USER', 'ROLE_OPERATOR', 'ROLE_ADMIN', 'ROLE_ANONYMOUS']
let data = Mock.mock({
  'list|1-10': [{
    username: '@first',
    roles: () => { return [Roles[Math.floor(Math.random() * 5) % 4]] },
    cname: '@cname',
    email: '@email',
    birthDate: '@date("yyyy/MM/dd")',
    address: '@county(true)'
  }]
}).list
module.exports = [
  {
    username: 'user',
    roles: ['ROLE_USER'],
    cname: '普通用户'
  },
  {
    username: 'operator',
    roles: ['ROLE_OPERATOR'],
    cname: '运营人员'
  },
  {
    username: 'admin',
    roles: ['ROLE_ADMIN'],
    cname: '管理员'
  },
  {
    username: 'root',
    roles: ['ROLE_USER', 'ROLE_OPERATOR', 'ROLE_ADMIN'],
    cname: '超级用户'
  }
].concat(data)
