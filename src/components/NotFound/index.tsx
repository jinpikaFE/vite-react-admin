import { storeGlobalUser } from '@/store/globalUser'
import { Button, Result } from 'antd'
import React from 'react'
import type { NotFoundPropsType } from './type'

const DefaultExtra = () => {
  const onBackHome = () => {
    storeGlobalUser.onGoPermissionRoute()
  }
  return (
    <Button type="primary" onClick={onBackHome}>
      返回首页
    </Button>
  )
}

const NotFound: React.FC<NotFoundPropsType> = ({
  status = '404',
  title = '404',
  subTitle = '对不起！您访问的页面不存在',
  extra = <DefaultExtra />
}) => {
  return (
    <>
      <Result status={status} title={title} subTitle={subTitle} extra={extra} />
    </>
  )
}

export default NotFound
