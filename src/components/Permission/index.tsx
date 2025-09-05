import { storeGlobalUser } from '@/store/globalUser'
import { router } from '@config/routes'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import NotFound from '../NotFound'
import ForbiddenPage from '@/403'

type PermissionProps = {
  children: React.ReactNode
  menuName?: string
}

const Permission: React.FC<PermissionProps> = ({ children, menuName }) => {
  const navigate = useNavigate()

  return menuName && !storeGlobalUser?.hasMenuNamePermission(menuName || '') ? (
    <ForbiddenPage />
  ) : (
    <div>{children}</div>
  )
}

const ObserverPermission = observer(Permission)

export default ObserverPermission
