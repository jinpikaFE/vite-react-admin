import React, { useEffect } from 'react';
import * as echarts from 'echarts';

function useEChart(
  chartRef: React.MutableRefObject<HTMLElement | any>,
  options: echarts.EChartsOption,
) {
  let myChart: any = null;

  function renderChart() {
    const chart = echarts.getInstanceByDom(chartRef.current);
    if (chart) {
      myChart = chart;
    } else {
      myChart = echarts.init(chartRef.current);
    }
    myChart.setOption(options);
    // 获取 ECharts 高德地图组件
    var amapComponent = myChart.getModel().getComponent('amap');
    // 获取高德地图实例，使用高德地图自带的控件
    var amap = amapComponent.getAMap();
    // 添加控件 和高德地图API用法相同
    amap.addControl(new window.AMap.Scale());
    amap.addControl(new window.AMap.ToolBar());
  }

  useEffect(() => {
    renderChart();
  }, [options]);

  useEffect(() => {
    return () => {
      myChart && myChart.dispose();
    };
  }, []);

  return;
}

export default useEChart;
