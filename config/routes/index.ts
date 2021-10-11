import { lazy } from 'react';
import type { RouteType } from './type';

const routes: RouteType[] = [
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    component: lazy(() => import('@/pages/Login')),
  },
  {
    path: '/',
    component: lazy(() => import('@/layouts/BasicLayout')),
    routes: [
      {
        path: '/home',
        component: lazy(() => import('@/pages/Home')),
      },
      {
        path: '/admin',
        component: lazy(() => import('@/layouts/BlankLayout')),
        routes: [
          {
            path: '/admin/userManager',
            component: lazy(()=>import('@/pages/Admin/userManager'))
          },
          {
            path: '/admin/roleManager',
            component: lazy(()=>import('@/pages/Admin/roleManager'))
          }
        ],
      },
      {
        path: '/menu',
        component: lazy(() => import('@/pages/SideMenu')),
      },
    ],
  },
];

export default routes;
