import React from 'react';
import { renderRoutes } from 'react-router-config';
import type { RouteConfig } from 'react-router-config';

const Home: React.FC<{ route: RouteConfig }> = (props) => {
  const { route } = props;
  return (
    <>
      <>{renderRoutes(route.routes)}</>
    </>
  );
};

export default Home;
