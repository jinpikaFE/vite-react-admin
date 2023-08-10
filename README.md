# 体验地址

[Vite-React-Ts-Amin](http://vite-admin.jinxinapp.cn/)

[monitor-vite-admin](http://monitor-vite-admin.jinxinapp.cn/login) - 用于对上面网页监控，前端统一脚手架。上面地址因为资源问题，可能服务会挂。

# Vite-React-Ts-Amin

进行 vite 4.0 升级

- 分支 vite_4.0 版本为通用的模版，可进行 clone 直接使用
- 分支 vite_4.0_tiny 版本为轻量版本，只涉及layout布局，代码规划，基础路由等基本功能。
- 分支 1.0 版本为 vite2.0 版本，功能更全，后续会对 vite_4.0 版本进行内容补充
- 预览请使用mock模式启动 npm run start:mock
- master 也已经同步vite_4.0
- vite_4.0 后端接口修改为 [spring-for-vite](https://github.com/jinpikaFE/spring-for-vite) 基于[mall-tiny](https://github.com/macrozheng/mall-tiny)框架编写

## 相关技术

| 技术                             | 官网                              | 描述             |
| -------------------------------- | --------------------------------- | ---------------- |
| Vite 4.X                         | https://cn.vitejs.dev/            | 基础脚手架       |
| React Router 6.X                 | https://reactrouter.com/en/main   | react 路由管理   |
| ant-design 5.X                   | https://ant.design/index-cn       | ui 组件          |
| @ant-design/pro-components 2.4.0 | https://procomponents.ant.design/ | 中后台高阶组件   |
| mobx 6.8.0                       | https://mobx.js.org/README.html   | 轻量级状态管理   |
| typescript                       | -                                 | 代码类型规范     |
| axios                            | -                                 | 数据请求         |
| prettier                         | -                                 | 代码美化，格式化 |
| eslint                           | -                                 | 代码规范         |
| stylelint                        | -                                 | css 代码规范     |
| husky                            | -                                 | git commit 检验  |
| lint-staged                      | -                                 | git commit 检验  |

## 项目简介

基于 vite-mobx-TypeScript-react 开发的后台管理系统

[个人博客中,Problem 记录了该项目开发中遇到的相关问题](http://blog.jinxinapp.cn/#/problem/vite4-react-admin)

![项目截图](./src/assets/show.png)

## 主要功能

- 登录功能
  - token 存储
  - 后端 jwt
  - 权限相关控制
- 全屏显示
- i18n 国际化
  - 使用 react-intl-hooks 进行国际化处理
- 单元测试
- 菜单管理
  - 表结构，级联操作
- 用户管理
  - 强校验
  - 文件上传功能(图片上传)
- 角色管理
  - 角色联动菜单进行权限控制
- 前端埋点
  - 统计 pv，uv 且展示
- echart，高德 api 地图数据展示
  - 通过 AMapUI 取 geoJSON 进行地图渲染
- 持续更新中。。。

## 安装依赖

推荐使用 pnpm

```bash
pnpm install
npx husky install
```

## 脚本描述

### 开发启动

```bash
npm run start
# mock模式启动
npm run start:mock
```

### 打包

```bash
npm run build
```

### 检查代码样式

```bash
npm run lint
```

### 测试代码

```bash
npm run test
```
