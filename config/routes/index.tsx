import NotFoundPage from '@/404'
import App from '@/App'
import ErrorPage from '@/ErrorPage'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Test from '@/pages/Test'
import TestChild from '@/pages/Test/TestChild'
import { storage } from '@/utils/Storage'
import { HomeFilled, SmileFilled } from '@ant-design/icons'
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
