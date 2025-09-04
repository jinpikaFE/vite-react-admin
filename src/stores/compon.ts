import { TProColumns } from '@/pages/authManage/ComponManage/type';
import { makeAutoObservable } from 'mobx';

class Compon {
  componData: TProColumns[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  setComponData = (val: TProColumns[]) => {
    this.componData = val;
  };
}
export const localeCompon = new Compon();
