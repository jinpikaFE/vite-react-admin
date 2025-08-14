import { RouteType } from '.'
import NotFoundPage from '@/404'
import App from '@/App'
import ErrorPage from '@/ErrorPage'
import RoleManangement from '@/pages/accessManagement/RoleManangement'
import UserManagement from '@/pages/accessManagement/UserManagement'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Test from '@/pages/Test'
import TestChild from '@/pages/Test/TestChild'
import { HomeFilled, LockOutlined, SmileFilled } from '@ant-design/icons'
import { Navigate } from 'react-router'

/**
 * 路由日志中间件
 * @param {{ request: Request }} ctx - 上下文对象，包含 request
 * @param {() => Promise<void>} next - 下一个中间件函数
 */
async function loggingMiddleware(ctx: { request: Request }, next: () => Promise<void>) {
  const url = new URL(ctx.request.url)
  console.log(`开始跳转: ${url.pathname}${url.search}`)
  const start = performance.now()
  await next()
  const duration = performance.now() - start
  console.log(`跳转完成: ${duration}ms`)
}

export const routers = [
  {
    path: '/',
    unstable_middleware: [loggingMiddleware],
    /** 承载布局 */
    Component: App,
    errorElement: <ErrorPage />,
    icon: <SmileFilled />,
    children: [
      /** 首页重定向 */
      {
        index: true,
        element: <Navigate replace to="home" />
      },
      /** 布局下路由，页面路由在该children配置 */
      {
        path: 'home',
        name: '首页',
        icon: <HomeFilled />,
        Component: Home,
        permissionObj: true
      },
      {
        path: 'frist',
        name: '嵌套路由',
        icon: <SmileFilled />,
        permissionObj: true,
        children: [
          {
            path: 'oneOne',
            name: '一级-1',
            Component: Test,
            permissionObj: true,
            children: [
              {
                path: ':id',
                name: '一级-1-二级',
                permissionObj: true,
                Component: TestChild
              }
            ]
          },
          {
            path: 'oneTwo',
            name: '一级-2',
            permissionObj: true,
            Component: Test
          },
          {
            path: 'hideInMenu',
            name: 'hideInMenu',
            permissionObj: true,
            hideInMenu: true,
            Component: TestChild
          }
        ]
      },
      {
        path: 'accessManagement',
        name: '权限管理',
        icon: <LockOutlined />,
        permissionObj: true,
        children: [
          {
            index: true,
            /** 重定向 */
            element: <Navigate replace to="userManagement" />
          },
          {
            path: 'userManagement',
            name: '用户管理',
            permissionObj: true,
            Component: UserManagement
          },
          {
            path: 'roleManagement',
            name: '角色管理',
            permissionObj: true,
            Component: RoleManangement
          },
          {
            path: 'layoutNone',
            name: '布局隐藏',
            hideLayout: true,
            Component: TestChild
          }
        ]
      },
      {
        path: 'layoutNone',
        name: '布局隐藏',
        hideInMenu: true,
        hideLayout: true,
        Component: TestChild
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    Component: Login
  },
  { path: '*', Component: NotFoundPage }
] as RouteType[]
