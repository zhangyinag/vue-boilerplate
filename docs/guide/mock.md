# 模拟服务器

## 概念
模拟服务器是借助 `express` 搭建的`Node`服务器， 尽量还原了实际后台的各种场景：

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


