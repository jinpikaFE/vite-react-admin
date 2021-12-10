import React, { Suspense } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '@config/routes';
import Loading from '@/components/Loading';

const RouterView = () => {
  return (
    // 建议使用 HashRouter
    <Suspense fallback={<Loading />}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </Suspense>
  );
};

export default RouterView;
