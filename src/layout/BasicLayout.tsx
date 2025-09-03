import defaultProps from '@/_defaultProps'
import Permission from '@/components/Permission'
import { storeGlobalUser } from '@/store/globalUser'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import Settings from '@config/defaultSettings'
import { RouteType } from '@config/routes'
import { routers } from '@config/routes/routers'
import { useAsyncEffect } from 'ahooks'
import { Dropdown, MenuProps } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Outlet, matchRoutes, useLocation, useNavigate } from 'react-router'

export const GlobalUserInfo = React.createContext<Partial<User.UserEntity>>({})

const BasicLayout: React.FC = props => {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [filteredRoutes, setFilteredRoutes] = useState<RouteType[]>(routers)
  const navigate = useNavigate()
  const location = useLocation()
  const matchRouteArr = matchRoutes(storeGlobalUser.relRouters, location)
  const matchRoute = matchRouteArr?.[matchRouteArr?.length - 1]?.route
  const hideLayout = !!matchRoute?.hideLayout

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [window.location.pathname]) // 禁止修改

  useAsyncEffect(async () => {
    if (pathname !== '/login') {
      await storeGlobalUser.getUserDetail()
      // 用户信息加载完成后，过滤路由
      getFilterRoutes()
    }
  }, [])

  /**
   * 递归过滤路由，根据用户权限过滤可访问的路由
   * @param routes 原始路由数组
   * @returns 过滤后的路由数组
   */
  const filterRoutesRecursively = (routes: any[]): any[] => {
    return routes.reduce((acc, route) => {
      // 如果没有 menuName，通常是重定向或特殊路由，保留
      if (!route.menuName) {
        // 如果有子路由，递归过滤子路由
        if (route.children) {
          const filteredChildren = filterRoutesRecursively(route.children)
          // 如果子路由全部被过滤掉，则当前路由也不显示
          if (filteredChildren.length > 0) {
            acc.push({
              ...route,
              children: filteredChildren
            })
          }
        } else {
          acc.push(route)
        }
        return acc
      }

      // 检查当前路由是否有权限
      const hasPermission = storeGlobalUser.hasMenuNamePermission(route.menuName)

      if (hasPermission) {
        // 如果有子路由，递归过滤子路由
        if (route.children) {
          const filteredChildren = filterRoutesRecursively(route.children)
          acc.push({
            ...route,
            children: filteredChildren
          })
        } else {
          acc.push(route)
        }
      }

      return acc
    }, [] as any[])
  }

  const getFilterRoutes = async () => {
    console.log(matchRoute, 'matchRoute')

    // 如果是超级管理员，直接返回原始路由
    if (storeGlobalUser.isSuperAdmin()) {
      setFilteredRoutes(storeGlobalUser.relRouters)
      return
    }

    // 普通用户进行递归权限过滤
    const filteredRoutes = filterRoutesRecursively(storeGlobalUser.relRouters)
    console.log(filteredRoutes, 'filteredRoutes')
    setFilteredRoutes(filteredRoutes)
  }

  const items: MenuProps['items'] = [
    {
      key: 'out',
      label: (
        <div
          onClick={async () => {
            storeGlobalUser.globalLogout()
            navigate('login', { replace: true })
          }}
        >
          退出登录
        </div>
      )
    }
  ]

  const renderPremissionOutlet = () => {
    return (
      <Permission menuName={matchRoute?.menuName}>
        <Outlet />
      </Permission>
    )
  }

  return (
    <GlobalUserInfo.Provider value={storeGlobalUser.userInfo}>
      <ProLayout
        {...defaultProps}
        route={filteredRoutes?.[0]}
        pure={hideLayout}
        location={{
          pathname
        }}
        avatarProps={{
          src: storeGlobalUser.userInfo?.avatar,
          size: 'small',
          title: storeGlobalUser.userInfo?.nickName,
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
          renderPremissionOutlet()
        ) : (
          <PageContainer>{renderPremissionOutlet()}</PageContainer>
        )}
      </ProLayout>
    </GlobalUserInfo.Provider>
  )
}

const ObserverBasicLayout = observer(BasicLayout)

export default ObserverBasicLayout
