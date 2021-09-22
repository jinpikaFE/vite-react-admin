import UseRouteChild from '@/hooks/UseRouteChild';
import { RouteType } from '@config/routes/type';
import React from 'react';

const Layout: React.FC<{ routes: RouteType[] }> = (props) => {
  const { routes } = props;
  return <>{UseRouteChild({ routes })}</>;
};

export default Layout;
