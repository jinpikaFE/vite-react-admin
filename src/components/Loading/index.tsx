import React from 'react';
import { Image } from 'antd';
import loading from '@/assets/loading.gif';

const Loading: React.FC<{ imgUrl?: string }> = (props) => {
  const { imgUrl } = props;
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Image
        src={imgUrl}
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

Loading.defaultProps = {
  imgUrl: loading,
};

export default Loading;
