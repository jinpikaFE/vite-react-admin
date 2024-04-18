import { StepBackwardOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { storeCount } from '@/store/count'
import { observer } from 'mobx-react'
import { Suspense } from 'react'
import Loading from '@/components/loading'
import MyOutlet from '@/components/myOutlet'

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
      <MyOutlet />
    </>
  )
}

export default observer(Test)
