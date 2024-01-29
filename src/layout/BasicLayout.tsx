import { storeGlobalUser } from '@/store/globalUser'
import { storage } from '@/utils/Storage'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { RouteType, router } from '@config/routes'
import { useAsyncEffect } from 'ahooks'
import { Dropdown, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import defaultProps from '@/_defaultProps'
import Settings from '@config/defaultSettings'
import { observer } from 'mobx-react'
import React from 'react'
import { routers } from '@config/routes/routers'

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

  const [showLayout, setShowLayout] = useState(false)

  /** 处理菜单权限隐藏菜单 */
  const reduceRouter = (routers: RouteType[]): RouteType[] => {
    const authMenus = storeGlobalUser?.userInfo?.menus
      ?.filter(item => item?.type === ComponTypeEnum.MENU || item?.type === ComponTypeEnum.PAGE)
      ?.map(item => item?.title)

    return routers?.map(item => {
      if (item?.children) {
        const { children, ...extra } = item
        return {
          ...extra,
          routes: reduceRouter(item?.children),
          hideInMenu:
            item?.hideInMenu || !item?.children?.find(citem => authMenus?.includes(citem?.name))
        }
      }
      return {
        ...item,
        hideInMenu: item?.hideInMenu || !authMenus?.includes(item?.name)
      }
    }) as any
  }

  useEffect(() => {
    setPathname(window.location.pathname)
    setShowLayout(!matchRoute?.[matchRoute?.length - 1]?.route?.hideLayout)
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

  return (
    <GlobalUserInfo.Provider value={storeGlobalUser.userInfo}>
      {showLayout ? (
        <ProLayout
          {...defaultProps}
          route={reduceRouter(router?.routes)?.[1]}
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
            <Outlet />
          </PageContainer>
        </ProLayout>
      ) : (
        <Outlet />
      )}
    </GlobalUserInfo.Provider>
  )
}

export default observer(BasicLayout)
