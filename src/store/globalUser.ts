import { getCurrentUserInfo } from '@/apis/accessManagement/user'
import { WebSee } from '@/utils/webSee'
import { makeAutoObservable } from 'mobx'

class GlobalUser {
  userInfo: Partial<User.UserEntity> = {}
  constructor() {
    makeAutoObservable(this)
  }

  async getUserDetail() {
    const res = await getCurrentUserInfo()
    this.userInfo = res?.data
    new WebSee(res?.data?.username)
  }

  setUserInfo(user: Partial<User.UserEntity>) {
    this.userInfo = user
  }
}

export const storeGlobalUser = new GlobalUser()
