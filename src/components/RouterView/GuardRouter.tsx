import { localeMonitor } from '@/stores/monitor';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  withRouter,
  useLocation,
} from 'react-router-dom';

const _GuardRouterHelper: React.FC<any> = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (JSON.stringify(localeMonitor.pvData) !== '{}') {
      console.log({
        uid: localeMonitor.uvData?.uid,
        ip: localeMonitor.uvData?.ip,
        pathname: localeMonitor.pvData?.pathname,
        startTime: localeMonitor.pvData?.startTime,
        durationVisit:
          new Date().getTime() - localeMonitor.pathStartTime.getTime(),
      });
      // 记录一次
    }
    localeMonitor.setPvData({
      uid: localeMonitor.uvData?.uid,
      ip: localeMonitor.uvData?.ip,
      pathname,
      startTime: new Date()
    });
    localeMonitor.setPathStartTime(new Date());
  }, [pathname]);
  return null;
};

const GuardRouterHelper = withRouter(_GuardRouterHelper);

const GuardRouter: React.FC<any> = (props) => {
  return (
    <Router>
      <GuardRouterHelper />
      {props.children}
    </Router>
  );
};

export default GuardRouter;
