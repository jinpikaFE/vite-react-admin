import { Outlet, useNavigate } from 'react-router'
import { StepBackwardOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { storeCount } from '@/store/count'
import { observer } from 'mobx-react'

const Test: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <p>{storeCount.count}</p>
      <StepBackwardOutlined />
      <Space>
        <Button
          onClick={() => {
            navigate('/frist/oneOne/3')
          }}
        >
          跳转
        </Button>
        <Button
          onClick={() => {
            storeCount.increment()
          }}
        >
          +1
        </Button>

        <Button
          type="primary"
          onClick={() => {
            storeCount.increment()
            throw new Error('主动抛出错误')
          }}
        >
          erro
        </Button>
      </Space>
      <Outlet />
    </>
  )
}

export default observer(Test)
