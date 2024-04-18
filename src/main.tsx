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

export const RouterGlobalContext = React.createContext<{
  loading: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}>({ loading: true })

const AppRoot = () => {
  const [routerConfig,setRouterConfig] = useState(routers)
  const [loading, setLoading] = useState(true)
  useAsyncEffect(async () => {
    await storeGlobalUser.getUserDetail()

    routers[1].children = getRoutes(storeGlobalUser?.userInfo?.menus)
    setRouterConfig(routers)
    storeGlobalRouter.setRouters(routers)
    setLoading(false)
  }, [loading])

  useEffect(()=>{
    console.log(loading);
    
  },[loading])

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
