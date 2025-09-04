import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'

/**
 * 403 权限不足页面
 */
const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate('/home')
  }

  const handleGoBack = () => {
    navigate(-1)
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
          <Button onClick={handleGoBack}>返回上一页</Button>
        </div>
      }
    />
  )
}

export default ForbiddenPage
