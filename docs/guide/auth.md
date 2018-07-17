# 验证插件

## 验证及授权

- `验证` : 验证用户身份， 将有一个实体表明用户身份(如 User), 也可以没有身份
- `授权` : 某个身份(或没有身份)资源访问权限

用户：

```js
    {
        username: 'user',
        roles: ['ROLE_USER']
    }
```

角色：

```js
    {
        roleCode: 'ROLE_ADMIN',
        roleName: '管理员'
    }
```

资源：

```js
   {
       pid: 'home',
       name: '首页',
       description: null,
       configurable: true,
       children: []
   }
```

**如果一个用户没有登录， 将拥有 `ROLE_ANONYMOUS`角色的权限**

视图与路由都是资源（菜单作为视图的一种）， 默认对菜单与路由设置了权限控制：
1. 菜单的权限控制
 菜单使用json数据创建， 见 `components/menu/config.ts` :

 ```js
    {
        name: 'Dashboard',
        icon: 'dashboard',
        pid: 'home.dashboard',
        link: '/dashboard'
      }
 ```

 指定`pid`即可

2. 路由的权限控制
    在路由的元数据中添加`pid`, 见`router/routes.ts`

 ```js
    {
       path: 'dashboard',
       name: 'dashboard',
       component: Dashboard,
       meta: {pid: 'home.dashboard', cname: '仪表盘'}
     }
 ```

 ## 流程

 ### 登录流程

 见 `views/login/LoginBoxForm.vue`
 1. 输入用户名及密码
 2. 获取上次未授权目标地址
 3. 清空上次认证信息(user, token, targetUrl, acl)
 4. 检查是否开启了`token`验证，如果开启，默认登录的返回的结果为`token`,
 存储token值
 5. 检查上次未授权目标地址是否为空，不为空跳转到地址，否则跳转到首页

 ### 授权流程

 见`router/front-guard.ts`
 1. 输入任意 `url`, 路由守卫判断该地址是否在白名单
 2. 判断用户是否登录过，没有登录则先获取权限列表
 3. 判断是否拥有目标地址的权限
 4. 再次判断是否登录，没有登录则先保存目标地址， 跳转到登录页面
 若已经登录，则跳转到 `401`页面

 ## $auth 对象

 可以在vue实例上访问`$auth`获取验证相关的方法与属性：

  ```js
     export const auth = {
       set targetUrl (url: string| null) {
         setTargetUrl(url)
       },
       get targetUrl (): string| null {
         return getTargetUrl()
       },
       set user (user: User| null) {
         setUser(user)
       },
       get user (): User| null {
         return getUser()
       },
       set acl (acl: Array<string>) {
         setAcl(acl)
       },
       get acl (): Array<string> {
         return getAcl()
       },
       get isAuthenticated (): boolean {
         return !!getUser()
       },
       get currentUrl (): string {
         return window.location.hash.substr(1)
       },
       get token () {
         return getToken()
       },
       set token (token: string| null) {
         setToken(token)
       },
       get tokenKey () {
         return tokenKey
       },
       get tokenEnabled () {
         return enabled
       },
       checkPermission: checkPermission,
       clear: clear
     }
  ```

?> 应该始终从该`$auth`上进行验证相关的操作，
    虽然你可能知道这些数据是存放在`vuex`中
