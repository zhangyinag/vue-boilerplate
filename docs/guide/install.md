## 安装

### Injected Commands

- **`mock:server`**

  Run an mocker server at `localhost:3000`

  ** you can change this config afterwards.**

  ```
  mock:server

  Options:

    none
  ```

### Installing in an Already Created Project

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