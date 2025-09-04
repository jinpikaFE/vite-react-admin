import NotFound from '@/components/NotFound';
import Authorized from '@/utils/Authorized';
import ProCard from '@ant-design/pro-card';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Auth2: React.FC = () => {
  return (
    <>
      {Authorized.check(
        'admin2',
        <ProCard>Test</ProCard>,
        <NotFound
          status="403"
          title="403"
          subTitle="对不起！暂无该页面访问权限！请联系管理员或更换账号登录"
          extra={
            (
              <>
                <p>
                  <Link to={'/15757182982'}>联系管理员</Link>
                </p>
                <Button type="primary">
                  <Link to="/login">重新登录</Link>
                </Button>
              </>
            ) as React.ReactDOM | any
          }
        />,
      )}
    </>
  );
};

export default Auth2;
