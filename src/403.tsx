import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'
import { storeGlobalUser } from './store/globalUser'

/**
 * 403 权限不足页面
 */
const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBackHome = () => {
    storeGlobalUser.onGoPermissionRoute()
  }

  const handleReLogin = () => {
    navigate('/login', { replace: true })
  }

  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问此页面"
      extra={
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button type="primary" onClick={handleBackHome}>
            返回首页
          </Button>
          <Button onClick={handleReLogin}>重新登录</Button>
        </div>
      }
    />
  )
}

export default ForbiddenPage
