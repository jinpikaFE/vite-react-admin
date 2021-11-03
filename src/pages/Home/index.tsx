import ProCard from '@ant-design/pro-card';
import { Button, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import RcResizeObserver from 'rc-resize-observer';
import Maps from './maps';
import { findPvAll, findUvAll } from './services';
import type { PvStatisticsType, UvStatisticsType } from './type';
import moment from 'moment';

const Home: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [uvStatistics, setUvStatistics] = useState<UvStatisticsType>();
  const [pvStatistics, setPvStatistics] = useState<PvStatisticsType>();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const resUv = await findUvAll();
      const resPv = await findPvAll();
      setUvStatistics(resUv.data);
      setPvStatistics(resPv.data);
    };
    getData();
  }, []);

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
          <ProCard
            split="horizontal"
            colSpan={{ xs: 24, sm: 12, md: 12, lg: 10, xl: 10 }}
          >
            <ProCard split="horizontal">
              <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                <ProCard title="总访问量(UV)">
                  <Statistic value={uvStatistics?.uvTotal || '--'} />
                </ProCard>
                <ProCard title="总流量(PV)">
                  <Statistic value={pvStatistics?.pvTotal || '--'} />
                </ProCard>
              </ProCard>
              <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                <ProCard title="昨日全部流量(PV)">
                  {pvStatistics?.pvLastDay || '--'}
                </ProCard>
                <ProCard title="本月累计流量(PV)">
                  {pvStatistics?.pvThisMonth || '--'}
                </ProCard>
                <ProCard title="今年累计流量(PV)">
                  {pvStatistics?.pvThisYear || '--'}
                </ProCard>
              </ProCard>
              <ProCard split="vertical">
                <ProCard title="历史峰值(PV)">
                  <Statistic value={pvStatistics?.pvPeak || '--'} />
                </ProCard>
                <ProCard title="平均访问时长(UV)">
                  {uvStatistics?.uvAverageTime
                    ? moment(Number(uvStatistics?.uvAverageTime)).format('hh:mm:ss')
                    : '--'}
                </ProCard>
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
