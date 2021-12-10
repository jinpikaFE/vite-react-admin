import React from 'react';
import { lazy } from 'react';
import type { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@/layouts/BlankLayout')) as any,
    routes: [
      {
        path: '/',
        exact: true,
        // eslint-disable-next-line react/display-name
        render: () => {
          return <Redirect to={'/login'} />;
        },
      },
      {
        path: '/login',
        component: lazy(() => import('@/pages/Login')),
      },
      {
        path: '/',
        component: lazy(() => import('@/layouts/BasicLayout')) as any,
        routes: [
          {
            path: '/home',
            component: lazy(() => import('@/pages/Home')),
          },
          {
            path: '/admin',
            component: lazy(() => import('@/pages/Admin')) as any,
            routes: [
              {
                path: '/admin/test',
                component: lazy(() => import('@/pages/Admin/test')),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
