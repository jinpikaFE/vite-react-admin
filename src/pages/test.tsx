import React from 'react';
import UseRouteChild from '@/hooks/UseRouteChild';

const Test: React.FC = (props) => {
  const { routes } = props;
  console.log(routes);
  return <div>tests<UseRouteChild routes={routes} /></div>;
};

export default Test;
