import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import Loading from './components/loading'
import { useAsyncEffect } from 'ahooks'
import { storeGlobalUser } from './store/globalUser'
import { RouteType, getRouter } from '@config/routes'
import { storeGlobalRouter } from './store/globalRouter'
import App from './App'
import ErrorPage from './ErrorPage'
import { SmileFilled } from '@ant-design/icons'
import NotFoundPage from './404'
import Login from './pages/Login'
import { getRoutes } from '@config/routes/routers'

import './styles/index.less'

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
    children: [
      /** 不进行动态路由的获取则在此处写死 */
      // getRoutes([
      //   {
      //     path: '/home',
      //     name: '首页',
      //     icon: 'HomeFilled',
      //     component: '/src/pages/Home/index.tsx',
      //     isToken: true
      //   },
      //   {
      //     path: '/frist',
      //     name: '嵌套路由',
      //     icon: 'SmileFilled',
      //     isToken: true,
      //     children: [
      //       {
      //         path: '/frist/oneOne',
      //         name: '一级-1',
      //         component: '/src/pages/Test/index.tsx',
      //         isToken: true,
      //         children: [
      //           {
      //             path: '/frist/oneOne/:id',
      //             name: '一级-1-二级',
      //             isToken: true,
      //             component: '/src/pages/Test/TestChild/index.tsx'
      //           }
      //         ]
      //       },
      //       {
      //         path: '/frist/oneTwo',
      //         name: '一级-2',
      //         isToken: true,
      //         component: '/src/pages/Test/index.tsx'
      //       },
      //       {
      //         path: '/frist/hideInMenu',
      //         name: 'hideInMenu',
      //         isToken: true,
      //         hideInMenu: true,
      //         component: '/src/pages/Test/TestChild/index.tsx'
      //       }
      //     ]
      //   }
      // ])
    ]
  },
  {
    path: '/login',
    name: '登录',
    element: <Login />
  },
  { path: '*', element: <NotFoundPage /> }
] as RouteType[]

export const RouterGlobalContext = React.createContext<{
  loading: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}>({ loading: true })

const AppRoot = () => {
  const [routerConfig, setRouterConfig] = useState(routers)
  const [loading, setLoading] = useState(true)
  useAsyncEffect(async () => {
    await storeGlobalUser.getUserDetail()

    /** 不进行动态获取则删除改行 */
    routers[1].children = getRoutes(storeGlobalUser?.userInfo?.menus as any[])
    /** end */
    setRouterConfig(routers)
    storeGlobalRouter.setRouters(routers)
    setLoading(false)
  }, [loading])

  if (loading) {
    return <Loading />
  }

  return (
    <RouterGlobalContext.Provider value={{ loading, setLoading }}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={createBrowserRouter(routerConfig)} fallbackElement={<Loading />} />
      </Suspense>
    </RouterGlobalContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<AppRoot />)
