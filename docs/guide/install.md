# 安装

## 在已有项目上安装

该模板使用了 `typescript`, `vuex`, `vue-router`, `sass`, 'babel', `eslint standard`
请在安装了以上官方插件后再安装该插件

 **Make sure you install these official plugins first, the `.vuerc` reference below**

``` json
{
  "useTaobaoRegistry": true,
  "presets": {
    "vue-boilerplate": {
      "useConfigFiles": true,
      "plugins": {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-typescript": {
          "classComponent": true,
          "useTsWithBabel": true
        },
        "@vue/cli-plugin-eslint": {
          "config": "standard",
          "lintOn": [
            "save"
          ]
        },
        "@vue/cli-plugin-unit-mocha": {}
      },
      "router": true,
      "vuex": true,
      "cssPreprocessor": "sass"
    }
  }

```

**Note: `unit test` and `e2e test` are optional, you can install them when you need it**

## 注入命令

- **`mock:server`**

  Run an mocker server at `localhost:3000`

  ** you can change this config afterwards.**

  ```
  mock:server

  Options:

    none
  ```
