import NotFound from '@/components/NotFound'
import { storage } from '@/utils/Storage'
import { Button, message } from 'antd'
import { Link, Navigate } from 'react-router-dom'
import { storeGlobalUser } from '@/store/globalUser'
import { useEffect, useState } from 'react'

const Permission: React.FC<{
  children: any
  name?: string
  permissionObj?: {
    isPagePermission?: boolean | undefined
    isToken?: boolean | undefined
  } & boolean
}> = ({ children, name, permissionObj }) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined)

  /** 解决Permission 在 数据加载之前渲染导致权限不实时更新问题 */
  useEffect(() => {
    setTimeout(() => {
      setIsAuth(!!storeGlobalUser?.userInfo?.menus?.map(item => item?.title)?.includes(name))
    }, 10)
  }, [storeGlobalUser?.userInfo])

  if (isAuth === undefined) {
    /**
     * todo
     */
    return 'loading...'
  }

  if ((permissionObj === true || permissionObj?.isPagePermission) && isAuth === false) {
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
