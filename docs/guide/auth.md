# 验证插件

## 验证及授权

- `验证` : 验证用户身份， 将有一个实体表明用户身份(如 User), 也可以没有身份
- `授权` : 某个身份(或没有身份)资源访问权限

用户：

```json
    {
        username: 'user',
        roles: ['ROLE_USER']
    }
```

角色：

```json
    {
        roleCode: 'ROLE_ADMIN',
        roleName: '管理员'
    }
```

资源：

```json
   {
       pid: 'home',
       name: '首页',
       description: null,
       configurable: true,
       children: []
   }
```

**如果一个用户没有登录， 将拥有 `ROLE_ANONYMOUS`角色的权限**

1. 跨域场景
2. token 验证场景
3. session验证场景
4. 数据持久化
5. 统一错误处理
6. 异步返回支持

使用 `lokijs` 作为内存数据库，借助装饰器实现  `Java SpringMvc` 风格的路由注册，
基于 `Restful` 风格构建路由结构， 每个控制器代表一个实体，并会自动创建一个相同名
称的集合，并将使用 `/inits`目录下的同名js文件作为初始化数据

## 创建模拟数据

1. 创建控制器(数据实体) 在`/controllers`目录下创建文件`books.js`

```js
    const Controller = require('../Controller')
    const Mapping = require('../Mapping')
    const RespError = require('../RespError')

    module.exports = class books extends Controller {
      @Mapping({url: '/books', method: 'get'})
      getRoles (req, res) {
        return this.collection.find()
      }
    }
```

2. 创建初始化数据 在`/inits`目录下创建文件`books.js`

```js
    module.exports = [
      {
        bookId: 001,
        bookName: 'Angular Guide'
      },
       {
          bookId: 002,
          bookName: 'Vue Guide'
        },
    ]

```

*你可以在这里执行任何数据初始化代码，只要确保导出一个数组对象即可*


## 异步返回

  使用`async`异步返回

```js
   async getAsync (req, res) {
    // TODO
   }

```

## 返回对象定制

  大部分应用都会对返回数据进行封装， 你可以在`transformer.js`中定制你的返回格式，
  默认如下：

```js
   module.exports = function transform (data, code, errMsg) {
     return {
       data: data,
       resultCode: code || '000000',
       resultMesg: errMsg
     }
   }

```

 你可以使用 `RespError` 抛出异常，该异常将会转换成一个返回对象:

```js
   throw new RespError('001', '用户名不能为空', null)
```

## 跨域处理

 你可以在 `cors.js` 文件中改变跨域策略， 默认如下：

```js
     res.header('Access-Control-Allow-Origin', origin)
     res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,PATCH,OPTIONS')
     res.header('Access-Control-Allow-Headers', 'Content-Type' + tokenHeader())
     res.header('Access-Control-Allow-Credentials', 'true')
```

## 验证

默认采用`session` 做️登录验证， 你也可以开启`token`验证，来实现一些安全策略，
默认开启`token`验证， 默认策略：该用户客户端的`token`与服务的`token`不一致，
验证失败；（目的是用于解决用一个浏览器交叉使用两个账号串号问题，同时也禁止了
异地同时登录）

你可以在`auth.js`下修改配置：
- `whiteList` 白名单
- `simpleCheck` 默认token验证策略

你可以在`token-service.js`下启用或关闭`token`功能、配置`tokenKey`等

## 数据模拟工具

建议配合`mockjs`模拟数据， 实例:

```js
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

```

## UI

默认提供了一个简易的UI控制台，打开`ui/index.html`

