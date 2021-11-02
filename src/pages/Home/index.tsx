import ProCard from '@ant-design/pro-card';
import { Button, Statistic } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import RcResizeObserver from 'rc-resize-observer';
import Maps from './maps';

const Home: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const history = useHistory();

  return (
    <>
      <ProCard>
        <Button
          onClick={() => {
            history.push('/manager/menu');
          }}
        >
          菜单管理
        </Button>
      </ProCard>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          style={{ marginTop: 8 }}
          ghost
          gutter={8}
          split={responsive ? 'horizontal' : 'vertical'}
        >
          <ProCard split="horizontal" colSpan={{ xs: 24, sm: 12, md: 12, lg: 10, xl: 10 }}>
            <ProCard split="horizontal">
              <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                <ProCard title="总访问量(UV)">
                  <Statistic value={79} />
                </ProCard>
                <ProCard title="总流量(PV)">
                  <Statistic value={79} />
                </ProCard>
              </ProCard>
              <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                <ProCard title="昨日全部流量(PV)">123</ProCard>
                <ProCard title="本月累计流量(PV)">234</ProCard>
                <ProCard title="今年累计流量(PV)">345</ProCard>
              </ProCard>
              <ProCard split="vertical">
                <ProCard title="历史峰值(PV)">
                  <Statistic value={79} />
                </ProCard>
                <ProCard title="平均访问时长(UV)">134 个</ProCard>
              </ProCard>
            </ProCard>
            <ProCard title="流量趋势">
              <div>图表</div>
              <div>图表</div>
              <div>图表</div>
              <div>图表</div>
              <div>图表</div>
            </ProCard>
          </ProCard>
          <ProCard title="地域分布情况">
            <Maps />
          </ProCard>
        </ProCard>
      </RcResizeObserver>
    </>
  );
};

export default Home;
