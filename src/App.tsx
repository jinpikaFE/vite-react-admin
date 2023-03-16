import { Suspense } from 'react'
import Loading from './components/loading'
import BasicLayout from './layout/BasicLayout'

const App = () => {
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <Suspense fallback={<Loading />}>
        <BasicLayout />
      </Suspense>
    </div>
  )
}

export default App
