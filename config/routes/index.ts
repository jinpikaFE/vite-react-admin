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
        component: lazy(() => import('@/pages/Admin')),
      },
    ],
  },
];

export default routes;
