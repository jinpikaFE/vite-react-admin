import { storeCount } from '@/store/count'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router'

const TestChild = () => {
  const navigate = useNavigate()

  return <>用户管理 非管理员隐藏 {storeCount.count} </>
}

export default observer(TestChild)
