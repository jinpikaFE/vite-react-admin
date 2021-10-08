import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import React from 'react';
import { findAllUser } from './services';

const Home: React.FC = () => {
  return (
    <>
      <ProCard>Home <Button onClick={async ()=>{
        await findAllUser()
      }}>test</Button></ProCard>
    </>
  );
};

export default Home;
