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
    roles: ['ROLE_USER']
  },
  {
    username: 'operator',
    roles: ['ROLE_OPERATOR']
  },
  {
    username: 'admin',
    roles: ['ROLE_ADMIN']
  },
  {
    username: 'root',
    roles: ['ROLE_USER', 'ROLE_OPERATOR', 'ROLE_ADMIN']
  }
].concat(data)
