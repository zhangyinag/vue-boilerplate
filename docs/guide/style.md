# 样式

## 文件说明

位于`/styles` 文件夹下

- `animate.scss`   定义动画及过渡 （属于公用样式的一部分）
- `common.scss`    公用样式
- `config.scss`    配置
- `function.scss`   函数
- `mixins.scss`   BEM 混合
- `normalize.scss`  浏览器一致化
- `utils.scss`  工具
- `variables.scss`  全局变量
- `index.scss`  入口


## BEM 风格

`BEM` 中有三个概念， `块`、`元素`、`修饰符`， 块是一个独立的模块，全局唯一， 可以单独使用，
元素为块的组成部分， 块和元素可能会有修饰符，比如`固定`、`高亮`之类的

```html
    <ul class="menu">
        <li class="menu__item menu__item--highlight">
        <li class="menu__item">
    </ul>
```

在`vue`中， 每个组件就是一个块， 所以`/components`下组件都是扁平结构，你可以给块
加上命名空间， 比如组件都以`c-`作为命名空间

一个块可以由多个块构成，嵌套块将作为元素存在，假设以上代码被封装成组件`c-menu`

```html
    <div class="dropdown">
        <c-menu class="dropdown__menu"></c-menu>
    </div>
```

对于`views`, 其下的组件主要功能是布局与调度，即其不存在太多的样式，它反映了页面结构，
所以它是嵌套的， 有两种方式避免命名冲突：

1. 所以的`views`下的组件都加上`scoped`, 这样做的缺点是你不能直接覆盖引用组件的样式
2. 由于`BEM`要求块是全局唯一的， 所以在嵌套结构中用简短的名字作为块名可能会引起块命名
冲突， 你可能需要长命名，如`authority-role-list`, 但这种方式在嵌套很深的情况下使用
起来非常不方便

一个比较折中的方式是， 给新建的视图块命名时， 先全局搜索该名字是否占用， 占用了可以加上
父级块作为命名空间再试， 直到不冲突为止

!> 原则上， 组件组件、与视图组件都应该有一个命名空间， 比如组件用`c-`，视图用`l-`, 但
考虑到这种写法的命名太长， 此项目没有采用


## sass支持

加入了BEM混合，便于快速的构建

一般方式：

```scss
@include b(menu) {
  display: block;
  @include e(item) {
    background: #e2e2e2;
    @include m(highlight) {
      color: #fff;
    }
  }
}
```

编译结果为：

```css
.menu {
  display: block;
}
.menu__item {
  background: #e2e2e2;
}
.menu__item--highlight {
  background: #999;
}

```

假设现在需要一个黑色的主题:
```scss
@include b(menu) {
  display: block;
  @include e(item) {
    background: #e2e2e2;
    @include m(highlight) {
      color: #fff;
    }
  }

  @include m(dark){
    background: #000;
    @include e(item){
      color: #fff;
    }
  }
}
```


编译结果为：

```css

.menu {
  display: block;
}
.menu__item {
  background: #e2e2e2;
}
.menu__item--highlight {
  color: #fff;
}

.menu--dark {
  background: #000;
}
.menu--dark .menu__item {
  color: #fff;
}

```

### 状态类

比如为表示一个菜单项是激活状态, 可以使用修饰符：`menu__item--active`, 你也可以
使用状态类

```scss
@include b(menu) {
  display: block;
  @include e(item) {
    background: #e2e2e2;
    @include when(active) {
      color: #fff;
    }
  }
}
```


编译结果为：

```css
.menu {
  display: block;
}
.menu__item {
  background: #e2e2e2;
}
.menu__item.is-active {
  color: #fff;
}

```

