import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '../config/routes'

import Loading from './components/loading'

type RouterType = typeof router

const App = () => {
  const [routerConfig, setRouterConfig] = useState<RouterType>() // 用于存储路由配置的状态

  useEffect(() => {
    // 发送异步请求来获取路由配置
    fetch('/api/v1/routes')
      .then(response => response.json())
      .then(data => {
        setRouterConfig(data.routes) // 将获取到的路由配置存储到状态中
      })
      .catch(error => {
        console.error('Error fetching routes:', error)
      })
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router as RouterType} fallbackElement={<Loading />} />
    </Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
