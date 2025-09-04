import { makeAutoObservable } from 'mobx'

class Count {
  count = 0
  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}

export const storeCount = new Count()
