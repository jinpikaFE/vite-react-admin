import { Outlet } from 'react-router-dom'
import { StepBackwardOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { storeCount } from '@/store/count'
import { observer } from 'mobx-react'
import { useAsyncEffect } from 'ahooks'
import { getData } from '@/apis'

const Test: React.FC = () => {
  useAsyncEffect(async () => {
    await getData()
  }, [])

  return (
    <>
      <p>{storeCount.count}</p>
      <StepBackwardOutlined />
      <Button
        type="primary"
        onClick={() => {
          storeCount.increment()
        }}
      >
        erro
      </Button>
      <Outlet />
    </>
  )
}

export default observer(Test)
