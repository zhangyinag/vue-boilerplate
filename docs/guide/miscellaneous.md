# 杂项

## 防止重复提交

如果一个创建表单，为了防止多次点击提交， 一般会在ajax请求中禁用， 但是这样是不能
严格是以上防止多次提交的，你需要使用 `debounce`去抖

## 多次查询结果与查询条件不一致问题

这种情况在模糊查询中尤为明显， 比如短时间内向后台一次发出了`a`、`b`、`c`，这里会
存在两个问题：
1. 视图会刷新三次
2. 最后一次的结果不一定是`c`的搜索结果

解决方案：这里简单的模拟了`rxjs`中`switchMap`的功能，一个会内部抹平的可订阅对象：

```js
const flatObject = getFlatSubject<User>((user) => {
    console.log(user)
})

flatObject.fire(queryUsersLikeUsername(qs))
```

