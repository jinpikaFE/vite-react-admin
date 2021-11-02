import React, { useEffect, useRef, useState } from 'react';
import 'echarts-extension-amap';
import useEChart from '@/components/UseECharts';
import { mapOptions } from './mapOptions';
import { findUvMaps } from './services';
import { useInterval, useUnmount } from 'ahooks';

const Maps: React.FC = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [interval, setInterval] = useState<number| null>(900000);

  const getDate = async () => {
    const res = await findUvMaps();
    setData(res.data);
  };

  useInterval(
    () => {
      getDate();
    },
    interval,
    { immediate: true },
  );

  useUnmount(()=>{
    setInterval(null)
  })

  useEChart(chartRef, mapOptions(data));

  return (
    <>
      <div style={{ width: '100%', height: '450px' }} ref={chartRef} />
    </>
  );
};

export default Maps;
