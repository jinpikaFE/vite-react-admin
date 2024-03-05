import { useEffect, useState } from 'react'
import BasicLayout from './layout/BasicLayout'
import { useLocation } from 'react-router-dom'
import { useAsyncEffect } from 'ahooks'
import { getIpInfo } from './apis'
import { storeMonitor } from './store/monitor'
import { WebSee } from './utils/webSee'

const App = () => {
  const [isHandled, setIsHandled] = useState(false)
  const location = useLocation()
  const [pvStartTime, setPvStartTime] = useState<number>()

  useEffect(() => {
    new WebSee(import.meta.env.VITE_APP_NAME)
  }, [])

  /** 获取ip 记录uv */
  useAsyncEffect(async () => {
    const res = await getIpInfo()
    if (res?.code === 200) {
      storeMonitor.setUvInfo({
        ip: res?.data?.ip,
        startTime: new Date().getTime(),
        area: `${res?.data?.countryName || ''}${res?.data?.provinceName || ''}${
          res?.data?.cityName || ''
        }`
      })
    }
  }, [])

  useEffect(() => {
    const handlePageClose = (event: Event) => {
      if (!isHandled) {
        // Your cleanup logic or confirmation message here
        WebSee.Log({
          type: 'uv',
          message: storeMonitor.uvInfo
        })
        /** 最后离开记录pv */
        WebSee.Log({
          type: 'pv',
          message: {
            startTime: pvStartTime,
            pathname: window.location?.pathname
          }
        })
        setIsHandled(true)
      }
    }

    const addEventListeners = () => {
      window.addEventListener('beforeunload', handlePageClose)
      window.addEventListener('pagehide', handlePageClose)
      window.addEventListener('unload', handlePageClose)
    }

    const removeEventListeners = () => {
      window.removeEventListener('beforeunload', handlePageClose)
      window.removeEventListener('pagehide', handlePageClose)
      window.removeEventListener('unload', handlePageClose)
    }

    addEventListeners()

    // Remove the event listeners when the component unmounts
    return () => {
      removeEventListeners()
    }
  }, [isHandled, pvStartTime])

  /** pv记录 */
  useEffect(() => {
    const startTime = new Date().getTime()
    setPvStartTime(startTime)
    return () => {
      WebSee.Log({
        type: 'pv',
        message: {
          startTime,
          pathname: location?.pathname
        }
      })
    }
  }, [location])

  return (
    <div
      style={{
        height: '100vh'
      }}
    >
      <BasicLayout />
    </div>
  )
}

export default App
