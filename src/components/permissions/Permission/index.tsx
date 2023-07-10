import NotFound from '@/components/NotFound'
import { storage } from '@/utils/Storage'
import { Button, message } from 'antd'
import { Link, Navigate } from 'react-router-dom'
import { storeGlobalUser } from '@/store/globalUser'

const Permission: React.FC<{
  children: any
  name?: string
  permissionObj?: {
    isPagePermission?: boolean | undefined
    isToken?: boolean | undefined
  } & boolean
}> = ({ children, name, permissionObj }) => {
  if (
    (permissionObj === true || permissionObj?.isPagePermission) &&
    !storeGlobalUser?.userInfo?.menus?.map(item => item?.title)?.includes(name)
  ) {
    return (
      <NotFound
        status="403"
        title="403"
        subTitle="对不起！暂无该页面访问权限！请联系管理员或更换账号登录"
        extra={
          <>
            <Button type="primary">
              <Link to="/login">重新登录</Link>
            </Button>
          </>
        }
      />
    )
  }

  const token = storage.get('token')
  if ((permissionObj === true || permissionObj?.isToken) && token) {
    return children
  }
  message.error('token不存在')
  return <Navigate replace to="/login" />
}

export default Permission
