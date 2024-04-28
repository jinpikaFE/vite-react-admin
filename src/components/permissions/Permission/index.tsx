import NotFound from '@/components/NotFound'
import { storage } from '@/utils/Storage'
import { Button, message } from 'antd'
import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import { GlobalUserInfo } from '@/layout/BasicLayout'
import TankShaking from '@/components/TankShaking'

const Permission: React.FC<{
  children: any
  name?: string
  isToken?: boolean
}> = ({ children, name, isToken }) => {
  // /** 使用context 解决 useeffect 监听不到mobx问题 */
  // const globalUserInfoContext = useContext(GlobalUserInfo)
  // const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined)

  // /** 解决Permission 在 数据加载之前渲染导致权限不实时更新问题 */
  // useAsyncEffect(async () => {
  //   if (globalUserInfoContext?.menus) {
  //     console.log(name)
  //     setIsAuth(!!globalUserInfoContext?.menus?.map(item => item?.title)?.includes(name))
  //   }
  // }, [globalUserInfoContext, window.location.pathname])

  // // if (isAuth === undefined) {
  // //   /**
  // //    * todo
  // //    */
  // //   return <TankShaking />
  // // }

  const token = storage.get('token')
  if (isToken && token) {
    return children
  }
  message.error('token不存在')
  return <Navigate replace to="/login" />
}

export default Permission
