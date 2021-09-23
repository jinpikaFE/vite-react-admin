import { makeAutoObservable } from 'mobx';

class Language {
  localeLang = 'zh';
  constructor() {
    makeAutoObservable(this);
  }

  setLocaleLang = (val: string) => {
    this.localeLang = val;
  };
}
export const localeLanguage = new Language();
