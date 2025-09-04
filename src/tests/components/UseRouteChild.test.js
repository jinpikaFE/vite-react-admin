import React, {lazy} from 'react';
import { render, cleanup } from '@testing-library/react';
import UseRouteChild from '../../hooks/UseRouteChild';

afterEach(cleanup);

it('should take a snapshot', () => {

  expect(UseRouteChild({
    path: '/home',
    component: lazy(() => import('@/pages/home')),
    routes: [
      {
        path: '/home/s',
        component: lazy(() => import('@/pages/test')),
      },
      {
        path: '/home/2',
        component: lazy(() => import('@/pages/test')),
      }
    ],
  })).toMatchSnapshot();
});
