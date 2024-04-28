import NotFoundPage from '@/404'
import ErrorPage from '@/ErrorPage'
import Login from '@/pages/Login'
import { SmileFilled } from '@ant-design/icons'
import { MenuDataItem } from '@ant-design/pro-components'
import { App } from 'antd'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { getRoutes } from './routers'

export type RouteType = {
  /** 是否隐藏菜单布局 */
  hideLayout?: boolean
  /** 在菜单栏是否显示 */
  hideInMenu?: boolean
  /** 是否需要token校验，true， 无token该页面禁止访问 */
  isToken?: boolean
  children?: RouteType[]
  /** 重定向 */
  redirect?: string
} & Partial<MenuDataItem> &
  RouteObject

export const getRouter = (routesConfig: RouteType[]) => {
  const routers = [
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
      children: [...getRoutes(routesConfig)]
    },
    {
      path: '/login',
      name: '登录',
      element: <Login />
    },
    { path: '*', element: <NotFoundPage /> }
  ] as RouteType[]
  return {
    routers,
    browserRouter: createBrowserRouter(routers)
  }
}
