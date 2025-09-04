# Vite-React-Ts-Amin

一个简易的vite-reat后台框架

分支1.0版本为通用的模版，可进行clone直接使用

## 项目简介

基于 vite-mobx-TypeScript-react 开发的后台管理系统

[示例链接](http://110.40.192.199:3003/login)

[项目中涉及的接口项目地址](https://github.com/jinxin1517/nest-admin)

[项目接口文档](http://nestadmin_dt.jinxinapp.cn/docs/)

[个人博客中,Problem记录了该项目开发中遇到的相关问题](http://110.40.192.199:3004/#/Problem/Personal/vite-react-admin)

![项目截图](./src/assets/show.png)

## 主要功能

- 登录功能
  - token存储
  - 后端jwt
  - 权限相关控制
- 全屏显示
- i18n国际化
  - 使用react-intl-hooks进行国际化处理
- 单元测试
- 菜单管理
  - 表结构，级联操作
- 用户管理
  - 强校验
  - 文件上传功能(图片上传)
- 角色管理
  - 角色联动菜单进行权限控制
- 前端埋点
  - 统计pv，uv且展示
- echart，高德api地图数据展示
  - 通过AMapUI取geoJSON进行地图渲染
- 持续更新中。。。

## 安装依赖

- node v12.14.0
- yarn 1.22.10

```bash
npm install
```

or

```bash
yarn
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