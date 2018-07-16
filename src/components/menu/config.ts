export interface MenuConfig {
  name: string
  icon?: string
  pid?: string,
  link?: string
  children?: Array<MenuConfig>
}
const options: Array<MenuConfig> = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    pid: 'home.dashboard',
    link: '/dashboard'
  },
  {
    name: '系统管理',
    icon: 'system',
    pid: 'home.system',
    children: [
      {
        name: '用户管理',
        pid: 'home.system.user',
        link: '/system/user'
      },
      {
        name: '权限管理',
        pid: 'home.system.authority',
        link: '/system/authority'
      }
    ]
  },
  {
    name: '第一级菜单',
    icon: 'test',
    children: [
      {
        name: '第二级菜单',
        children: [
          {
            name: '第三级菜单',
            link: '/none/none'
          }
        ]
      }
    ]
  }
]

export default options
