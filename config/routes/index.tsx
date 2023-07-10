import Permission from '@/components/permissions/Permission'
import { MenuDataItem } from '@ant-design/pro-components'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { routers } from './routers'
import { storeGlobalUser } from '@/store/globalUser'

enum ComponTypeEnum {
  MENU,
  PAGE,
  COMPON
}

export type RouteType = {
  /** 是否需要菜单布局 */
  layout?: string | 'hide'
  /** 在菜单栏是否显示 */
  hideInMenu?: boolean
  /** 权限控制 true 则都控制 */
  permissionObj?: {
    /** 是否进行页面权限控制，控制取后端数据 */
    isPagePermission?: boolean
    /** 判断token是否存在控制 */
    isToken?: boolean
  } & true
  children?: RouteType[]
} & Partial<MenuDataItem> &
  RouteObject

const reduceHiden = (citem: any) => {
  if (citem?.children) {
    for (let index = 0; index < citem?.children.length; index++) {
      const element = citem?.children[index]
      if (!citem?.hideInMenu) {
        return false
      }
      reduceHiden(element)
    }
  }

  return citem?.hideInMenu
}

const reduceRoute: (params: RouteType[]) => RouteType[] = (routesParams: RouteType[]) => {
  return routesParams?.map(item => {
    let curRouter = item
    if (item?.permissionObj) {
      curRouter = {
        ...curRouter,
        element: item?.element ? (
          <Permission name={item?.name} permissionObj={item?.permissionObj}>
            {item?.element}
          </Permission>
        ) : undefined
      }
    }
    if (item?.children) {
      curRouter = {
        ...curRouter,
        children: reduceRoute(item?.children) as any
      }
    }
    return curRouter
  })
}

const relRouters = reduceRoute(routers)

console.log(relRouters)

export const router = createBrowserRouter(relRouters)
