import { useEffect } from 'react'
import webSee from '@websee/core'
import performance from '@websee/performance'
import recordscreen from '@websee/recordscreen'
import BasicLayout from './layout/BasicLayout'

const App = () => {
  useEffect(() => {
    webSee.init({
      dsn: `${import.meta.env.VITE_MONITOR_URL}/v1/monitor`,
      apikey: 'vite-react-ts-admin',
      userId: '89757'
    })

    webSee.use(performance, {})
    webSee.use(recordscreen, {})
  }, [])

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      {/* <Suspense fallback={<Loading />}> */}
      <BasicLayout />
      {/* </Suspense> */}
    </div>
  )
}

export default App
