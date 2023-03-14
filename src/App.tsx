import {
  PageContainer,
  ProLayout,
  RouteContext,
  RouteContextType
} from '@ant-design/pro-components'
import Settings from '@config/defaultSettings'
import { ExtraRouteType, router } from '@config/routes'
import { useState } from 'react'
import { Outlet, RouteObject, useNavigate } from 'react-router-dom'
import defaultProps from './_defaultProps'
const App = () => {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [showLayout, setShowLayout] = useState<string>()
  const navigate = useNavigate()

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

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      {showLayout === 'hide' ? (
        <Outlet />
      ) : (
        <ProLayout
          {...defaultProps}
          route={reduceRouter(router?.routes)?.[1]}
          location={{
            pathname
          }}
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '七妮妮'
          }}
          menuFooterRender={props => {
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12
                }}
              >
                <div>© 2021 Made with love</div>
                <div>by Ant Design</div>
              </div>
            )
          }}
          menuItemRender={(item, dom) => {
            return item?.hideInMenu ? undefined : dom
          }}
          menuProps={{
            onClick: ({ key }) => {
              setPathname(key || '/')
              navigate(key || '/')
            }
          }}
          {...Settings}
        >
          <PageContainer>
            <Outlet />
            <RouteContext.Consumer>
              {(value: RouteContextType) => {
                setShowLayout(value?.layout)
                // 用户的标题
                return null
              }}
            </RouteContext.Consumer>
          </PageContainer>
        </ProLayout>
      )}
    </div>
  )
}

export default App
