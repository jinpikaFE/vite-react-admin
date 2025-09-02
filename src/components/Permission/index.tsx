import { storeGlobalUser } from '@/store/globalUser'
import { observer } from 'mobx-react'
import NotFound from '../NotFound'
import { Button } from 'antd'
import { useNavigate } from 'react-router'

type PermissionProps = {
  children: React.ReactNode
  menuName?: string
}

const Permission: React.FC<PermissionProps> = ({ children, menuName }) => {
  const navigate = useNavigate()

  const handleReLogin = () => {
    storeGlobalUser.globalLogout()
    navigate('/login', { replace: true })
  }

  return storeGlobalUser?.hasMenuNamePermission(menuName || '') ? (
    <div>{children}</div>
  ) : (
    <NotFound
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问此页面"
      extra={
        <Button type="primary" onClick={handleReLogin}>
          重新登录
        </Button>
      }
    />
  )
}

const ObserverPermission = observer(Permission)

export default ObserverPermission
