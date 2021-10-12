import { makeAutoObservable } from 'mobx';
import React, { RefObject } from 'react';

class RefRoot {
  rootRef: RefObject<HTMLDivElement> = React.createRef();;
  constructor() {
    makeAutoObservable(this);
  }

}
export const localeRefRoot = new RefRoot();
