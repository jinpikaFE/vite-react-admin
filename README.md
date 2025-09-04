# 体验地址

[在线预览](http://vite-admin.jinxinapp.cn/)

[monitor-vite-admin](http://monitor-vite-admin.jinxinapp.cn/login) - 用于对上面网页监控，前端统一脚手架。上面地址因为资源问题，可能服务会挂。

## Vite-React-Amin

- 分支 tiny 版本为轻量版本，只涉及layout布局，代码规划，基础路由等基本功能。
- 预览请使用mock模式启动 npm run start:mock。
- master 升级为vite7.x，全面升级所有依赖包到最新版本

## 相关技术

| 技术                             | 官网                              | 描述             |
| -------------------------------- | --------------------------------- | ---------------- |
| Vite 5.X                         | <https://cn.vitejs.dev/>            | 基础脚手架       |
| React Router 7.8                 | <https://reactrouter.com/en/main>   | react 路由管理   |
| ant-design 5.X                   | <https://ant.design/index-cn>       | ui 组件          |
| @ant-design/pro-components 2.4.0 | <https://procomponents.ant.design/> | 中后台高阶组件   |
| mobx 6.8.0                       | <https://mobx.js.org/README.html>   | 轻量级状态管理   |
| typescript                       | -                                 | 代码类型规范     |
| axios                            | -                                 | 数据请求         |
| prettier                         | -                                 | 代码美化，格式化 |
| eslint                           | -                                 | 代码规范         |
| stylelint                        | -                                 | css 代码规范     |
| husky                            | -                                 | git commit 检验  |
| lint-staged                      | -                                 | git commit 检验  |
| unocss                            | -                                | 原子化 CSS   |

## 最新升级记录 (2025年8月)

### 主要版本升级

- **React 18.2.0 → 19.1.1**: 升级到最新版本，支持新的并发特性
- **Vite 5.1.4 → 7.1.2**: 重大版本升级，提升构建性能
- **ESLint 8.56.0 → 9.33.0**: 迁移到新的平面配置格式 (eslint.config.js)
- **Ant Design 5.15.0 → 5.27.0**: 升级到最新版本，UI组件更稳定
- **TypeScript 5.2.2 → 5.9.2**: 类型系统优化
- **mobx 6.8.0 → 6.13.7**: 状态管理库升级
- **axios 1.3.4 → 1.11.0**: HTTP 客户端升级
- 添加 **unocss**

### 配置变更

- 迁移 ESLint 配置从 `.eslintrc.cjs` 到 `eslint.config.js`
- 更新 Vite 配置以适配 7.x 版本
- 修复正则表达式语法 (vite.config.ts)
- 添加全局类型定义支持

### 兼容性处理

- 解决 React 19 类型兼容性问题
- 更新 React Router 7.8 配置
- 修复 ESLint 9.x 全局变量定义

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
