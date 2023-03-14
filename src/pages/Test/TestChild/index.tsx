import { storeCount } from '@/store/count'
import { observer } from 'mobx-react'

const TestChild = () => {
  return <>TestChild{storeCount.count}</>
}

export default observer(TestChild)
