# 安装


``` sh
vue invoke vue-cli-plugin-vue-boilerplate
```

**该模板使用了 `typescript`, `vuex`, `vue-router`, `sass`, 'babel'
请在安装了以上官方插件后再安装该插件**


## 注入命令

- **`mock:server`**

  Run an mocker server at `localhost:3000`

  ** you can change this config afterwards.**

  ```
  mock:server

  Options:

    none
  ```

## 文件说明

`/mock` 模拟服务模块
 - `/mock/ui` 本地UI界面， 方便查看当前模拟数据库数据， 并可以执行`CRUD`操作

`/src/api` api接口

`/src/plugins` vue插件结合
 - `auth` 认证授权插件
 - `http` http插件
 - `svg` svg-icon插件

`/src/router` 路由相关

`/src/store` vuex相关




