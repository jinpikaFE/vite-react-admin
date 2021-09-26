import React from 'react';
import { Image } from 'antd';

const Loading: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Image
        src="http://assets.jinxinapp.cn/img/loading.gif"
        width="100%"
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        preview={false}
      />
    </div>
  );
};

export default Loading;
