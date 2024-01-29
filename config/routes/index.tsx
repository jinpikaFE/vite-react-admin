import Permission from '@/components/permissions/Permission'
import { MenuDataItem } from '@ant-design/pro-components'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { routers } from './routers'

export type RouteType = {
  /** 是否隐藏菜单布局 */
  hideLayout?: boolean
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

/** 只给最低层级套 Permission 组件 */
const renderElement = (item: RouteType) => {
  if (item?.element) {
    if (item?.children) {
      return item?.element
    }
    return (
      <Permission name={item?.name} permissionObj={item?.permissionObj}>
        {item?.element}
      </Permission>
    )
  }
  return undefined
}

const reduceRoute: (params: RouteType[]) => RouteType[] = (routesParams: RouteType[]) => {
  return routesParams?.map(item => {
    let curRouter = item
    if (item?.permissionObj) {
      curRouter = {
        ...curRouter,
        element: renderElement(item)
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

export const router = createBrowserRouter(relRouters)
