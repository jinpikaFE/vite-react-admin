import { RouteType } from '.'
import NotFoundPage from '@/404'
import App from '@/App'
import ErrorPage from '@/ErrorPage'
import Login from '@/pages/Login'
import { SmileFilled } from '@ant-design/icons'
import { ComponentType, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { IconCom } from './constatns'

const routesConfig: RouteType[] = [
  {
    path: '/home',
    name: '首页',
    icon: 'HomeFilled',
    component: '/src/pages/Home/index.tsx',
    permissionObj: true
  },
  {
    path: '/frist',
    name: '嵌套路由',
    icon: 'SmileFilled',
    permissionObj: true,
    children: [
      {
        path: '/frist/oneOne',
        name: '一级-1',
        component: '/src/pages/Test/index.tsx',
        permissionObj: true,
        children: [
          {
            path: '/frist/oneOne/:id',
            name: '一级-1-二级',
            permissionObj: true,
            component: '/src/pages/Test/TestChild/index.tsx'
          }
        ]
      },
      {
        path: '/frist/oneTwo',
        name: '一级-2',
        permissionObj: true,
        component: '/src/pages/Test/index.tsx'
      },
      {
        path: '/frist/hideInMenu',
        name: 'hideInMenu',
        permissionObj: true,
        hideInMenu: true,
        component: '/src/pages/Test/TestChild/index.tsx'
      }
    ]
  },
  {
    path: '/accessManagement',
    name: '权限管理',
    icon: 'LockOutlined',
    permissionObj: true,
    children: [
      {
        path: '/accessManagement',
        /** 重定向 */
        redirect: '/accessManagement/userManagement'
      },
      {
        path: '/accessManagement/userManagement',
        name: '用户管理',
        permissionObj: true,
        component: '/src/pages/accessManagement/UserManagement/index.tsx'
      },
      {
        path: '/accessManagement/roleManagement',
        name: '角色管理',
        permissionObj: true,
        component: '/src/pages/accessManagement/RoleManangement/index.tsx'
      },
      {
        path: '/accessManagement/componentManagement',
        name: '组件管理',
        permissionObj: true,
        component: '/src/pages/accessManagement/ComponManagement/index.tsx'
      },
      {
        path: '/accessManagement/resourceManagement',
        name: '资源管理',
        permissionObj: true,
        children: [
          {
            path: '/accessManagement/resourceManagement',
            /** 重定向 */
            redirect: '/accessManagement/resourceManagement/resourceCategory'
          },
          {
            path: '/accessManagement/resourceManagement/resourceCategory',
            name: '资源分类',
            permissionObj: true,
            component: '/src/pages/accessManagement/ComponManagement/index.tsx',
            hideInMenu: true
          },
          {
            path: '/accessManagement/resourceManagement/resourceCategory/:resourceCategoryId/resource',
            name: '资源列表',
            permissionObj: true,
            component: '/src/pages/accessManagement/ResourceManangement/Resource/index.tsx',
            hideInMenu: true
          }
        ]
      }
    ]
  },
  {
    path: '/layoutNone',
    name: '布局隐藏',
    hideInMenu: true,
    hideLayout: true,
    component: '/src/pages/Test/TestChild/index.tsx'
  }
]

const modules = import.meta.glob('@/pages/**/*.tsx')
console.log(modules)

const getRoutes = (r: RouteType[]): any[] => {
  return r?.map(item => {
    let curRouter = item
    if (item?.component) {
      curRouter = {
        ...curRouter,
        component: undefined,
        async lazy() {
          const Page = await lazy(modules[item.component] as any)
          console.log(Page)

          return { Component: Page }
        }
      }
    }

    if (item?.icon) {
      curRouter = {
        ...curRouter,
        icon: IconCom[item.icon as string]
      }
    }

    if (item?.redirect) {
      curRouter = {
        ...curRouter,
        redirect: undefined,
        element: <Navigate replace to={item?.redirect} />
      }
    }

    return {
      ...curRouter,
      children: item?.children ? getRoutes(item?.children) : undefined
    }
  })
}

export const routers = [
  {
    path: '/',
    /** 重定向 */
    element: <Navigate replace to="/home" />
  },
  {
    path: '/',
    /** 承载布局 */
    element: <App />,
    errorElement: <ErrorPage />,
    icon: <SmileFilled />,
    children: [...getRoutes(routesConfig)]
  },
  {
    path: '/login',
    name: '登录',
    element: <Login />
  },
  { path: '*', element: <NotFoundPage /> }
] as RouteType[]
