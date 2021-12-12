import React from 'react';
import { renderRoutes } from 'react-router-config';
import type { RouteConfig } from 'react-router-config';
import ProCard from '@ant-design/pro-card';
import Authorized from '@/utils/Authorized';
import { Button } from 'antd';

const Auth31: React.FC = () => {
  return (
    <ProCard>
      Auth31
      <br />
      {Authorized.check(
        'admin1',
        <Button type="primary">admin2</Button>,
        '权限按钮',
      )}
      <br />
      {Authorized.check('admin1', <Button type="primary">admin2</Button>, null)}
      <br />
      {Authorized.check('admin', <Button type="primary">admin2</Button>, null)}
      <br />
    </ProCard>
  );
};

export default Auth31;
