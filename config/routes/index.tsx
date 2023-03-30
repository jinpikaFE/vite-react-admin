import NotFoundPage from '@/404'
import App from '@/App'
import ErrorPage from '@/ErrorPage'
import UserManagement from '@/pages/accessManagement/UserManagement'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Test from '@/pages/Test'
import TestChild from '@/pages/Test/TestChild'
import { storage } from '@/utils/Storage'
import { HomeFilled, LockOutlined, SmileFilled } from '@ant-design/icons'
import { MenuDataItem } from '@ant-design/pro-components'
import { message } from 'antd'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

export type ExtraRouteType = {
  /** 是否需要菜单布局 */
  layout?: string | 'hide'
  /** 在菜单栏是否显示 */
  hideInMenu?: boolean
} & Partial<MenuDataItem>

const Permissions = ({ children }: any) => {
  const token = storage.get('token')
  if (token) {
    return children
  }
  message.error('token不存在')
  return <Navigate replace to="/login" />
}

export const router = createBrowserRouter([
  {
    path: '/',
    /** 重定向 */
    element: <Navigate replace to="/home" />
  },
  {
    path: '/',
    /** 承载布局 */
    element: (
      <Permissions>
        <App />
      </Permissions>
    ),
    errorElement: <ErrorPage />,
    icon: <SmileFilled />,
    children: [
      /** 布局下路由，页面路由在该children配置 */
      {
        path: '/home',
        name: '首页',
        icon: <HomeFilled />,
        element: <Home />
      },
      {
        path: '/frist',
        name: '嵌套路由',
        icon: <SmileFilled />,
        children: [
          {
            path: 'oneOne',
            name: '一级-1',
            element: <Test />,
            children: [
              {
                path: ':id',
                name: '一级-1-二级',
                element: <TestChild />
              }
            ]
          },
          {
            path: 'oneTwo',
            name: '一级-2',
            element: <Test />
          },
          {
            path: 'hideInMenu',
            name: 'hideInMenu',
            hideInMenu: true,
            element: <TestChild />
          }
        ]
      },
      {
        path: '/accessManagement',
        name: '权限管理',
        icon: <LockOutlined />,
        children: [
          {
            path: 'userManagement',
            name: '用户管理',
            element: <UserManagement />
          },
          {
            path: 'roleManagement',
            name: '角色管理',
            element: <Test />
          },
          {
            path: 'componentManagement',
            name: '组件管理',
            element: <Test />
          },
          {
            path: 'resourceManagement',
            name: '资源管理管理',
            element: <Test />
          }
        ]
      },
      {
        path: 'layoutNone',
        name: '布局隐藏',
        hideInMenu: true,
        layout: 'hide',
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
] as (RouteObject & ExtraRouteType)[])
