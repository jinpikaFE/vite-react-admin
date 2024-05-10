import defaultProps from '@/_defaultProps'
import MyOutlet from '@/components/myOutlet'
import { storeGlobalRouter } from '@/store/globalRouter'
import { storeGlobalUser } from '@/store/globalUser'
import { storage } from '@/utils/Storage'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import Settings from '@config/defaultSettings'
import { RouteType } from '@config/routes'
import { Dropdown, MenuProps } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'

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
  const matchRoute = matchRoutes(storeGlobalRouter.routers, location)

  const [showLayout, setShowLayout] = useState(false)

  /** 处理菜单权限隐藏菜单 */
  const reduceRouter = (routers: RouteType[]): RouteType[] => {
    return routers?.map(item => {
      if (item?.children) {
        const { children, ...extra } = item
        return {
          ...extra,
          routes: reduceRouter(item?.children)
        }
      }
      return item
    }) as any
  }

  useEffect(() => {
    setPathname(window.location.pathname)
    setShowLayout(!matchRoute?.[matchRoute?.length - 1]?.route?.hideLayout)
  }, [window.location.pathname])

  // useAsyncEffect(async () => {
  //   if (pathname !== '/login') {
  //     await storeGlobalUser.getUserDetail()
  //   }
  // }, [])

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

  return (
    <GlobalUserInfo.Provider value={storeGlobalUser.userInfo}>
      {showLayout ? (
        <ProLayout
          {...defaultProps}
          route={reduceRouter(storeGlobalRouter.routers)[1]}
          location={{
            pathname
          }}
          avatarProps={{
            src: storeGlobalUser.userInfo?.icon,
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
          menuProps={{
            onClick: ({ key }) => {
              navigate(key || '/')
            }
          }}
          {...Settings}
        >
          <PageContainer>
            <MyOutlet />
          </PageContainer>
        </ProLayout>
      ) : (
        <MyOutlet />
      )}
    </GlobalUserInfo.Provider>
  )
}

export default observer(BasicLayout)
