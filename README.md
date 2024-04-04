# 用于静态资源管理的仓库,和 jsdelivr 配合当图床用

## 待办

- ~~监听资源增加，并打印 cdn 加速链接~~
- ~~changelog 自动发版~~
- ~~`git action`实现自动`release`~~
- 加速链接自动粘贴到剪切板

## 功能

将静态资源移入`source`目录后，控制台自动打印对应的 cdn 加速链接

## 启动

`npm run start`

## 资源管理规则

统一放在`assets`目录下，后面的目录为具体项目结构，最后资源放在项目的`source`目录下

例如项目位置在`/Users/a/Desktop/monorepo-project/projects/z1the3-doc`

则对应的**本仓库下的**静态资源目录为

`/assets` + `/monorepo-project/projects/z1the3-doc` + `/source`
