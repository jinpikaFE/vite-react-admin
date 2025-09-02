import { MenuDataItem } from '@ant-design/pro-components'
import { createBrowserRouter, RouteObject } from 'react-router'
import { routers } from './routers'

export type RouteType = {
  /** 是否隐藏菜单布局 */
  hideLayout?: boolean
  /** 在菜单栏是否显示 */
  hideInMenu?: boolean
  /** 菜单名称（用于权限控制） */
  menuName?: string

  children?: RouteType[]
} & Partial<MenuDataItem> &
  RouteObject

export const router = createBrowserRouter(routers)
