import { getCurrentUserInfo } from '@/apis/admin'
import { makeAutoObservable } from 'mobx'

class GlobalUser {
  userInfo: Partial<User.UserEntity> = {}
  constructor() {
    makeAutoObservable(this)
  }

  async getUserDetail() {
    const res = await getCurrentUserInfo()
    this.userInfo = res?.data
  }
}

export const storeGlobalUser = new GlobalUser()
