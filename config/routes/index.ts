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
      { path: '/', redirect: '/home' },
      // {
      //   path: '/home/s',
      //   component: lazy(() => import('@/pages/test')),
      // },
    ],
  },
];

export default routes;
