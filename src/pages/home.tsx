import React, { lazy } from 'react';
import { Button } from 'antd';
import UseRouteChild from '@/hooks/UseRouteChild';
import { Route } from 'react-router-dom';
const Component = lazy(() => import('@/pages/test'));

const Test: React.FC = (props) => {
  console.log(props,'fw');
  
  return (
    <div>
      home
    </div>
  );
};

export default Test;
