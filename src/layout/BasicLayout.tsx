import { storeGlobalUser } from '@/store/globalUser'
import { storage } from '@/utils/Storage'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ExtraRouteType, router } from '@config/routes'
import { useAsyncEffect } from 'ahooks'
import { Dropdown, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, RouteObject, useNavigate } from 'react-router-dom'
import defaultProps from '@/_defaultProps'
import Settings from '@config/defaultSettings'
import { observer } from 'mobx-react'

const BasicLayout: React.FC = () => {
  const [pathname, setPathname] = useState(window.location.pathname)
  const navigate = useNavigate()
  const [showLayout, setShowLayout] = useState<boolean>(true)

  const reduceRouter = (
    routers: (RouteObject & ExtraRouteType)[]
  ): (RouteObject & ExtraRouteType)[] => {
    return routers?.map(item => {
      if (item?.children) {
        const { children, ...extra } = item
        return { ...extra, routes: reduceRouter(item?.children) }
      }
      return item
    }) as any
  }

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
          onClick={() => {
            storage.clear()
            navigate('login', { replace: true })
          }}
        >
          退出登录
        </div>
      )
    }
  ]

  return showLayout ? (
    <ProLayout
      {...defaultProps}
      route={reduceRouter(router?.routes)?.[1]}
      location={{
        pathname
      }}
      avatarProps={{
        src: 'https://jinpika-1308276765.cos.ap-shanghai.myqcloud.com/images/logo.png',
        size: 'small',
        title: storeGlobalUser.userInfo?.username,
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
      menuItemRender={(item, dom) => {
        return item?.hideInMenu ? undefined : dom
      }}
      menuRender={(props, defaultDom) => {
        if ((props?.layout as string) === 'hide') {
          setShowLayout(false)
          return null
        }
        return defaultDom
      }}
      menuProps={{
        onClick: ({ key }) => {
          navigate(key || '/')
        }
      }}
      {...Settings}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </ProLayout>
  ) : (
    <Outlet />
  )
}

export default observer(BasicLayout)
