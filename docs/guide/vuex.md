# Vuex

## 使用说明

你应该始终以命名模块的方式提供， 在 `store/modules/`下注册模块， 并在
`store/index.ts` 中引入， 你可以为你的命名空间导出一个 `Helper`

```js
import {BindingHelpers} from 'vuex-class/lib/bindings'

export const AppModule: BindingHelpers = namespace('app')
```

`vue`组件中使用

```js
@AppModule.Mutation setAsideExpand: void
@AppModule.State asideExpand: boolean
```

`vue`组件外使用

```js
store.commit('app/setToken', token)
(<any>store.state).app.token
```