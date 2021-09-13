import React from 'react';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import UseRouteChild from '@/hooks/UseRouteChild';
import '@ant-design/pro-layout/dist/layout.css';
import { RouteType } from '@config/routes/type';


const BasicLayout: React.FC<{ routes: RouteType[] }> = (props) => {
  const { routes } = props;
  console.log(routes);
  return (
    <ProLayout>
      home
      <UseRouteChild routes={routes} />
    </ProLayout>
  );
};

export default BasicLayout;
