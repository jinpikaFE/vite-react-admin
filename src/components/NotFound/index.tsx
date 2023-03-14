import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import type { NotFoundPropsType } from './type'

const NotFound: React.FC<NotFoundPropsType> = ({
  status = '404',
  title = '404',
  subTitle = '对不起！您访问的页面不存在',
  extra = (
    <Button type="primary">
      <Link to="/">返回首页</Link>
    </Button>
  )
}) => {
  return (
    <>
      <Result status={status} title={title} subTitle={subTitle} extra={extra} />
    </>
  )
}

export default NotFound
