import UseRouteChild from '@/hooks/UseRouteChild';
import type { RouteType } from '@config/routes/type';
import React from 'react';

const BasicLayout: React.FC<{ routes: RouteType[] }> = (props) => {
  return <><UseRouteChild routes={props?.routes} /></>;
};

export default BasicLayout;
