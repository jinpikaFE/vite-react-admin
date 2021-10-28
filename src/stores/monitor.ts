import { makeAutoObservable } from 'mobx';
import type { MonitorUvType } from './type';

class Monitor {
  uvData: MonitorUvType = {};
  pvData: MonitorUvType & { pathname?: string } = {};
  pathStartTime: Date = new Date();
  constructor() {
    makeAutoObservable(this);
  }

  setUvData = (val: MonitorUvType) => {
    this.uvData = { ...this.uvData, ...val };
  };

  setPvData = (val: MonitorUvType & { pathname?: string }) => {
    this.pvData = { ...this.pvData, ...val };
  };

  setPathStartTime = (val: Date) => {
    this.pathStartTime = val;
  };
}
export const localeMonitor = new Monitor();
