import { getCurrentUserInfo } from '@/apis/accessManagement/user'
import { makeAutoObservable } from 'mobx'
import webSee from '@websee/core'
import performance from '@websee/performance'
import recordscreen from '@websee/recordscreen'

class GlobalUser {
  userInfo: Partial<User.UserEntity> = {}
  constructor() {
    makeAutoObservable(this)
  }

  async getUserDetail() {
    const res = await getCurrentUserInfo()
    this.userInfo = res?.data
    webSee.init({
      dsn: `${import.meta.env.VITE_MONITOR_URL}/v1/monitor`,
      apikey: import.meta.env.VITE_APP_NAME,
      userId: res?.data?.username
    })

    webSee.use(performance, {})
    webSee.use(recordscreen, {})
  }

  setUserInfo(user: Partial<User.UserEntity>) {
    this.userInfo = user
  }
}

export const storeGlobalUser = new GlobalUser()
