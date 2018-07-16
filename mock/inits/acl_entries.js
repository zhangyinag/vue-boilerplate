module.exports = [
  // ROLE_USER
  {
    sid: 'ROLE_USER',
    pid: 'home',
    principal: false
  },
  {
    sid: 'ROLE_USER',
    pid: 'home.dashboard',
    principal: false
  },
  // ROLE_OPERATOR
  {
    sid: 'ROLE_OPERATOR',
    pid: 'home',
    principal: false
  },
  // ROLE_ADMIN
  {
    sid: 'ROLE_ADMIN',
    pid: 'home',
    principal: false
  },
  {
    sid: 'ROLE_ADMIN',
    pid: 'home.dashboard',
    principal: false
  },
  {
    sid: 'ROLE_ADMIN',
    pid: 'home.system',
    principal: false
  },
  {
    sid: 'ROLE_ADMIN',
    pid: 'home.system.user',
    principal: false
  },
  {
    sid: 'ROLE_ADMIN',
    pid: 'home.system.authority',
    principal: false
  },
  // ROLE_ANONYMOUS
  {
    sid: 'ROLE_ANONYMOUS',
    pid: 'home',
    principal: false
  }
]
