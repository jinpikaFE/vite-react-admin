import { storeGlobalUser } from '@/store/globalUser'
import { storage } from '@/utils/Storage'
import { PageContainer, ProBreadcrumb, ProLayout } from '@ant-design/pro-components'
import { RouteType, router } from '@config/routes'
import { useAsyncEffect } from 'ahooks'
import { Dropdown, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, matchRoutes, useLocation, useNavigate } from 'react-router'
import defaultProps from '@/_defaultProps'
import Settings from '@config/defaultSettings'
import { observer } from 'mobx-react'
import React from 'react'
import { routers } from '@config/routes/routers'
import { logout } from '@/apis/login'

export enum ComponTypeEnum {
  MENU,
  PAGE,
  COMPON
}

export const GlobalUserInfo = React.createContext<Partial<User.UserEntity>>({})

const BasicLayout: React.FC = props => {
  const [pathname, setPathname] = useState(window.location.pathname)
  const navigate = useNavigate()
  const location = useLocation()
  const matchRoute = matchRoutes(routers, location)

  const hideLayout = !!matchRoute?.[matchRoute?.length - 1]?.route?.hideLayout

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [window.location.pathname])

  useAsyncEffect(async () => {
    if (pathname !== '/login') {
      await storeGlobalUser.getUserDetail()
    }
  }, [])

  const items: MenuProps['items'] = [
    {
      key: 'out',
      label: (
        <div
          onClick={async () => {
            await logout()
            storage.clear()
            navigate('login', { replace: true })
          }}
        >
          退出登录
        </div>
      )
    }
  ]

  return (
    <GlobalUserInfo.Provider value={storeGlobalUser.userInfo}>
      <ProLayout
        {...defaultProps}
        route={routers?.[0]}
        pure={hideLayout}
        location={{
          pathname
        }}
        avatarProps={{
          src: storeGlobalUser.userInfo?.avatar,
          size: 'small',
          title: storeGlobalUser.userInfo?.userName,
          render: (_, defaultDom) => {
            return <Dropdown menu={{ items }}>{defaultDom}</Dropdown>
          }
        }}
        menuFooterRender={props => {
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12
              }}
            >
              <div>© 2023 Made with love</div>
              <div>by JPK</div>
            </div>
          )
        }}
        title="管理后台"
        menuProps={{
          onClick: ({ key }) => {
            navigate(key || '/')
          }
        }}
        {...Settings}
      >
        {hideLayout ? (
          <Outlet />
        ) : (
          <PageContainer>
            <Outlet />
          </PageContainer>
        )}
      </ProLayout>
    </GlobalUserInfo.Provider>
  )
}

export default observer(BasicLayout)
