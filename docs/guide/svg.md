# svg图标插件

## 介绍

使用svg图标， 将svg图片置于`plugins/svg/icons`，通过 SvgIcon组件调用

```html
<svg-icon icon="avatar" class="sm"></svg-icon>
```

提供了几个基本的尺寸样式：

```css
.svg-icon.sm{
    font-size: 16px;
  }
  .svg-icon.md{
    font-size: 32px;
  }
  .svg-icon.lg{
    font-size: 48px;
  }
  .svg-icon.xl{
    font-size: 64px;
  }
```

## 注意事项

1. 如果你的svg图片中包含`path`， 请删除， 否则 `fill` 属性不会生效，
特别的从`iconfont`库中导出的svg会包含，你可以手动删除或则单个下载

2. 在配置webpack时， 去掉了脚手架对`svg`的默认处理，如果有特殊需要，请自行修改

```js
module.exports = {
  chainWebpack: config => {
    // note: it means to take care of the svgs of /icons,
    // these code handle all svgs, should optimize this if you need
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    // add replacement loader(s)
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })
  }
}

```

!> 实际上可以将默认规则应用于 `/icons` 之外， `svgRule`只应用于`/icons`,
将来可能会做优化
