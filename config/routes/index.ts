import { lazy } from 'react';
import type { RouteType } from './type';

const routes: RouteType[] = [
  {
    path: '/test',
    meta: {
      title: '首页',
    },
    component: lazy(() => import('@/pages/test')),
  },
  {
    path: '/',
    component: lazy(() => import('@/layouts/BasicLayout')),
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        component: lazy(() => import('@/pages/home')),
        routes: [
          {
            path: '/home/s',
            component: lazy(() => import('@/pages/test')),
          },
        ],
      },
      // {
      //   path: '/home/s',
      //   component: lazy(() => import('@/pages/test')),
      // },
    ],
  },
  {
    component: lazy(() => import('@/pages/test')),
  },
];

export default routes;
