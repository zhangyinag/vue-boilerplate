# vue-cli-plugin-vue-boilerplate

> vue-boilerplate plugin for vue-cli

``` tip
    Wanring: this plugin base on @vue/cli 3.0,
    other visions may not be supported,
    Please check your vue-cli version first.
```

## Injected Commands

- **`mock:server`**

  Run an mocker server at `localhost:3000`

  ** you can change this config afterwards.**

  ```
  mock:server

  Options:

    none
  ```

## Installing in an Already Created Project

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

``` sh
vue add vue-cli-plugin-vue-boilerplate
```

- More detail visit [vue-boilerplate](https://github.com/zhangyinag/vue-boilerplate)
