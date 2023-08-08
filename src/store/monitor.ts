import { makeAutoObservable } from 'mobx'

class Monitor {
  uvInfo: StoreMonitor.UvInfoEntity = {}
  constructor() {
    makeAutoObservable(this)
  }

  setUvInfo(uv: StoreMonitor.UvInfoEntity) {
    this.uvInfo = { ...this.uvInfo, ...uv }
  }
}

export const storeMonitor = new Monitor()
