import React, { lazy, useEffect } from 'react';
import request from 'umi-request';
import { Button } from 'antd';
import UseRouteChild from '@/hooks/UseRouteChild';
import { Route } from 'react-router-dom';
const Component = lazy(() => import('@/pages/test'));

const Test: React.FC = (props) => {
  useEffect(() => {
    request
      .get('/api/datauser')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return <div>home</div>;
};

export default Test;
