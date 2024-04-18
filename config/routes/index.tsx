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
  /** 重定向 */
  redirect?: string
} & Partial<MenuDataItem> &
  RouteObject





export const router = createBrowserRouter(routers)
