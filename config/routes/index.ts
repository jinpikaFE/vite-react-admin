import { lazy } from 'react';
import type { RouteType } from './type';

const routes: RouteType[] = [
  {
    path: '/test',
    meta: {
      title: '登录',
    },
    component: lazy(() => import('@/pages/test')),
    routes: [
      { path: '/test/my', component: lazy(() => import('@/pages/home')) },
    ],
  },
  {
    path: '/home',
    meta: {
      title: '首页',
    },
    component: lazy(() => import('@/pages/test')),
  },
];

export default routes;
