import { storeGlobalUser } from '@/store/globalUser'
import { router } from '@config/routes'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import NotFound from '../NotFound'

type PermissionProps = {
  children: React.ReactNode
  menuName?: string
}

const Permission: React.FC<PermissionProps> = ({ children, menuName }) => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log(
      storeGlobalUser.getFristHasPermissRoute(),
      'storeGlobalUser.getFristHasPermissRoute()'
    )

    router.navigate(storeGlobalUser.getFristHasPermissRoute()?.path || '/', { replace: true })
  }, [storeGlobalUser.accessibleFlatMenu])

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
