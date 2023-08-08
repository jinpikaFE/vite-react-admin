import { Outlet } from 'react-router-dom'
import { StepBackwardOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { storeCount } from '@/store/count'
import { observer } from 'mobx-react'

const Test: React.FC = () => {
  return (
    <>
      <p>{storeCount.count}</p>
      <StepBackwardOutlined />
      <Button
        type="primary"
        onClick={() => {
          storeCount.increment()
          throw new Error('主动抛出错误')
        }}
      >
        erro
      </Button>
      <Outlet />
    </>
  )
}

export default observer(Test)
