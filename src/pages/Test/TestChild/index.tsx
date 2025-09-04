import { storeCount } from '@/store/count'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router'

const TestChild = () => {
  const navigate = useNavigate()

  return <>TestChild{storeCount.count} </>
}

export default observer(TestChild)
