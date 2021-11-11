import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { WOW } from 'wowjs';
import 'animate.css';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import SwiperCore, {
  Scrollbar,
  Navigation,
  Mousewheel,
  Keyboard,
  Autoplay,
} from 'swiper';
import useEChart from '@/components/UseECharts';
import { useEventEmitter } from 'ahooks';
import { Radio, RadioChangeEvent } from 'antd';

SwiperCore.use([Scrollbar, Navigation, Mousewheel, Keyboard, Autoplay]);

type dateSelectValType = 'day' | 'week' | 'month' | 'year';

const Banner: React.FC = () => {
  const [dateSelectVal, setDateSelectVal] = useState<dateSelectValType>();

  const linePvRef = useRef(null);
  const lineUvRef = useRef(null);
  const renderEcharts$ = useEventEmitter();
  const [optionInit, setOptionInit] = useState<echarts.EChartsOption>({
    title: {
      text: '流量趋势(PV)',
      textAlign: 'left',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  });
  const wow = new WOW({
    boxClass: 'swiper-content',
    animateClass: 'animated',
    offset: 100,
    mobile: true,
    live: true,
    callback: function () {
      // useEChart(linePvRef, optionInit)
      console.log(1);

      renderEcharts$.emit();
    },
    scrollContainer: null,
  });
  wow.init();

  const options = [
    { label: '一天', value: 'day' },
    { label: '一周', value: 'week' },
    { label: '一个月', value: 'month' },
    { label: '一年', value: 'year' },
  ];

  useEChart(linePvRef, optionInit, false, renderEcharts$);
  useEChart(
    lineUvRef,
    {
      ...optionInit,
      title: {
        text: '访问趋势(UV)',
        textAlign: 'left',
      },
      series: [
        {
          data: [300, 170, 68, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    },
    false,
    renderEcharts$,
  );

  const dateSelectChange = (e: RadioChangeEvent) => {
    setDateSelectVal(e.target.value);
  };

  return (
    <>
      <Radio.Group
        options={options}
        onChange={dateSelectChange}
        value={dateSelectVal}
        defaultValue="week"
        optionType="button"
        buttonStyle="solid"
        style={{ marginBottom: '10px' }}
      />
      <Swiper
        scrollbar={{
          hide: true,
        }}
        // loop
        autoplay={{ delay: 10000 }}
        navigation
        mousewheel
        keyboard
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className="swiper-content"
      >
        <SwiperSlide style={{ height: '300px' }}>
          <div ref={linePvRef} style={{ width: '100%', height: '100%' }}></div>
        </SwiperSlide>
        <SwiperSlide style={{ height: '300px' }}>
          <div ref={lineUvRef} style={{ width: '100%', height: '100%' }}></div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
