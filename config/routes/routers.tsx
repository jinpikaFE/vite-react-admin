import NotFoundPage from '@/404'
import App from '@/App'
import { MENU_NAMES } from '@/constants/menuNames'
import ErrorPage from '@/ErrorPage'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import SysDeptManage from '@/pages/systemManagement/SysDeptManage'
import SysMenuManage from '@/pages/systemManagement/SysMenuManage'
import SysRoleManage from '@/pages/systemManagement/SysRoleManage'
import SysUserManage from '@/pages/systemManagement/SysUserManage'
import Test from '@/pages/Test'
import TestChild from '@/pages/Test/TestChild'
import { Navigate, redirect } from 'react-router'
import { RouteType } from '.'

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

// async function permissionMiddleware(
//   ctx: { request: Request; context: any },
//   next: () => Promise<void>
// ) {
//   const token = storage.get('token')
//   if (!token) {
//     message.error('请先登录')
//     throw redirect('/login')
//   }
//   console.log(ctx,'ctx')
// }

const authLoader = async (ctx: { request: Request }) => {
  const url = new URL(ctx.request.url)
  console.log(url.pathname)
}

export const routers = [
  {
    path: '/',
    unstable_middleware: [loggingMiddleware],
    loader: authLoader,
    /** 承载布局 */
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      /** 首页重定向 */
      {
        index: true,
        element: <Navigate replace to="home" />,
        redirect: 'home'
      },
      /** 布局下路由，页面路由在该children配置 */
      {
        path: 'home',
        name: '首页',
        menuName: MENU_NAMES.HOME,
        Component: Home
      },
      {
        path: 'frist',
        name: '嵌套路由',
        menuName: MENU_NAMES.FIRST,
        children: [
          {
            index: true,
            element: <Navigate replace to="oneOne" />
          },
          {
            path: 'oneOne',
            name: '一级-1',
            menuName: MENU_NAMES.FIRST_ONE,
            Component: Test,

            children: [
              {
                index: true,
                element: <Navigate replace to="3" />
              },
              {
                path: ':id',
                name: '一级-1-二级',
                menuName: MENU_NAMES.FIRST_ONE_CHILD,
                Component: TestChild
              }
            ]
          },
          {
            path: 'oneTwo',
            name: '一级-2',
            menuName: MENU_NAMES.FIRST_TWO,
            Component: Test
          }
        ]
      },
      {
        path: 'systemManagement',
        name: '系统管理',
        menuName: MENU_NAMES.SYSTEM_MANAGEMENT,
        children: [
          {
            index: true,
            /** 重定向 不要加menuName */
            element: <Navigate replace to="sysUserManage" />
          },
          {
            index: true,
            path: 'sysUserManage',
            name: '用户管理',
            menuName: MENU_NAMES.SYS_USER_MANAGEMENT,
            Component: SysUserManage
          },
          {
            path: 'sysRoleManage',
            name: '角色管理',
            menuName: MENU_NAMES.SYS_ROLE_MANAGEMENT,
            Component: SysRoleManage
          },
          {
            path: 'sysDeptManage',
            name: '部门管理',
            menuName: MENU_NAMES.SYS_DEPT_MANAGEMENT,
            Component: SysDeptManage
          },
          {
            path: 'sysMenuManage',
            name: '菜单管理',
            menuName: MENU_NAMES.SYS_MENU_MANAGEMENT,
            Component: SysMenuManage
          }
        ]
      },
      {
        path: 'layoutNone',
        name: '布局隐藏',
        menuName: MENU_NAMES.LAYOUT_NONE,
        Component: TestChild
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    menuName: MENU_NAMES.LOGIN,
    Component: Login
  },
  { path: '*', Component: NotFoundPage }
] as RouteType[]
