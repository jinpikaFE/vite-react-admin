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
            path: '/admin',
            redirect: '/admin/test',
          },
          {
            path: '/admin/test',
            component: lazy(() => import('@/pages/Admin/test')),
          },
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
