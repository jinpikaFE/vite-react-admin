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
    children: []
  },
  {
    path: '/login',
    name: '登录',
    element: <Login />
  },
  { path: '*', element: <NotFoundPage /> }
] as RouteType[]

const AppRoot = () => {
  const [loading, setLoading] = useState(true)
  useAsyncEffect(async () => {
    await storeGlobalUser.getUserDetail()

    routers[1].children = getRoutes(storeGlobalUser?.userInfo?.menus)

    storeGlobalRouter.setRouters(routers)
    setLoading(false)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={createBrowserRouter(routers)} fallbackElement={<Loading />} />
    </Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<AppRoot />)
