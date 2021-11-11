import React, { useRef, useState } from 'react';
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

SwiperCore.use([Scrollbar, Navigation, Mousewheel, Keyboard, Autoplay]);

const Banner: React.FC = () => {
  const linePvRef = useRef(null);
  const renderEcharts$ = useEventEmitter();
  const [optionInit, setOptionInit] = useState<echarts.EChartsOption>({
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
    offset: 0,
    mobile: true,
    live: true,
    callback: function (box) {
      // useEChart(linePvRef, optionInit)
      renderEcharts$.emit();
    },
    scrollContainer: null,
  });
  wow.init();

  useEChart(linePvRef, optionInit, false, renderEcharts$);
  return (
    <>
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
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
