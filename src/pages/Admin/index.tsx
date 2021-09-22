import UseRouteChild from '@/hooks/UseRouteChild';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { RouteType } from '@config/routes/type';
import React from 'react';

const Home: React.FC<{ routes: RouteType[] }> = (props) => {
  return (
    <>
      <ProCard>Admin</ProCard>
    </>
  );
};

export default Home;
