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
import { Navigate } from 'react-router-dom'

export const routers = [
  {
    path: '/',
    /** 重定向 */
    element: <Navigate replace to="/home" />
  },
  {
    path: '/',
    /** 承载布局 */
    element: <App />,
    errorElement: <ErrorPage />,
    icon: <SmileFilled />,
    children: [
      /** 布局下路由，页面路由在该children配置 */
      {
        path: '/home',
        name: '首页',
        icon: <HomeFilled />,
        element: <Home />,
        permissionObj: true
      },
      {
        path: '/frist',
        name: '嵌套路由',
        icon: <SmileFilled />,
        permissionObj: true,
        children: [
          {
            path: '/frist/oneOne',
            name: '一级-1',
            element: <Test />,
            permissionObj: true,
            children: [
              {
                path: '/frist/oneOne/:id',
                name: '一级-1-二级',
                permissionObj: true,
                element: <TestChild />
              }
            ]
          },
          {
            path: '/frist/oneTwo',
            name: '一级-2',
            permissionObj: true,
            element: <Test />
          },
          {
            path: '/frist/hideInMenu',
            name: 'hideInMenu',
            permissionObj: true,
            hideInMenu: true,
            element: <TestChild />
          }
        ]
      },
      {
        path: '/accessManagement',
        name: '权限管理',
        icon: <LockOutlined />,
        permissionObj: true,
        children: [
          {
            path: '/accessManagement',
            /** 重定向 */
            element: <Navigate replace to="/accessManagement/userManagement" />
          },
          {
            path: '/accessManagement/userManagement',
            name: '用户管理',
            permissionObj: true,
            element: <UserManagement />
          },
          {
            path: '/accessManagement/roleManagement',
            name: '角色管理',
            permissionObj: true,
            element: <RoleManangement />
          }
        ]
      },
      {
        path: '/layoutNone',
        name: '布局隐藏',
        hideInMenu: true,
        hideLayout: true,
        element: <TestChild />
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    element: <Login />
  },
  { path: '*', element: <NotFoundPage /> }
] as RouteType[]
