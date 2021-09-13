import React, { lazy } from 'react';
import { Button } from 'antd';
import UseRouteChild from '@/hooks/UseRouteChild';
import { Route } from 'react-router-dom';
const Component = lazy(() => import('@/pages/test'));

const Test: React.FC = (props) => {
  return (
    <div>
      home
      {/* <Route path="/home/test" render={(props) => <Component />} /> */}
      <UseRouteChild routes={props.routes} />
      <Button>hoe</Button>
    </div>
  );
};

export default Test;
