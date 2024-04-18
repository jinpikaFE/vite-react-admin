import { Suspense } from 'react'
import Loading from '../loading'
import { Outlet } from 'react-router-dom'

const MyOutlet = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  )
}

export default MyOutlet
