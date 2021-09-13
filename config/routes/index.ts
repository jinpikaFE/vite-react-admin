import { lazy } from 'react';
import type { RouteType } from './type';

const routes: RouteType[] = [
  {
    path: '/',
    component: lazy(() => import('@/layouts/BasicLayout')),
    routes: [
      { path: '/test', component: lazy(() => import('@/pages/home')) },
    ],
  },
  {
    path: '/home',
    meta: {
      title: '首页',
    },
    component: lazy(() => import('@/pages/home')),
  },
];

export default routes;
