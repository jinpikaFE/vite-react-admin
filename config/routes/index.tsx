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
            path: '/authManage',
            component: lazy(() => import('@/layouts/BlankLayout')) as any,
            routes: [
              {
                path: '/authManage/componManage',
                component: lazy(
                  () => import('@/pages/authManage/ComponManage'),
                ),
              },
              {
                path: '/authManage/roleManage',
                component: lazy(() => import('@/pages/authManage/RoleManage')),
              },
              {
                path: '/authManage/userManage',
                component: lazy(() => import('@/pages/authManage/UserManage')),
              },
            ],
          },
          // 本地路由定义过的，下一级末尾添加404，未定义过的，即使三级路由也会404
          {
            path: '/admin',
            component: lazy(() => import('@/layouts/BlankLayout')) as any,
            routes: [
              {
                path: '/admin/auth1',
                component: lazy(() => import('@/pages/admin/Auth1')),
              },
              {
                path: '/admin/auth2',
                component: lazy(() => import('@/pages/admin/Auth2')),
              },
              {
                path: '/admin/auth3',
                // 有子路由且空白布局时
                component: lazy(() => import('@/layouts/BlankLayout')) as any,
                routes: [
                  {
                    path: '/admin/auth3/test',
                    // 有子路由且空白布局时
                    component: lazy(() => import('@/pages/admin/Auth3')),
                  },
                  {
                    path: '/admin/auth3/test3',
                    // 有子路由且空白布局时
                    component: lazy(() => import('@/pages/admin/Auth3/Auth31')),
                  },
                  {
                    path: '*',
                    component: lazy(() => import('@/components/NotFound')),
                  },
                ],
              },
              {
                path: '*',
                component: lazy(() => import('@/components/NotFound')),
              },
            ],
          },
          // 每一个层级末尾加404
          {
            path: '*',
            component: lazy(() => import('@/components/NotFound')),
          },
        ],
      },
      {
        path: '*',
        component: lazy(() => import('@/components/NotFound')),
      },
    ],
  },
];

export default routes;
