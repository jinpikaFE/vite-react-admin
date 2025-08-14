import { getCurrentUserInfo, getMenuList } from '@/apis/accessManagement/user'
import { WebSee } from '@/utils/webSee'
import { makeAutoObservable } from 'mobx'

class GlobalUser {
  userInfo: Partial<User.UserEntity> = {}
  userRoleMenu: User.RoleMenuEntity[] = []
  constructor() {
    makeAutoObservable(this)
  }

  async getUserDetail() {
    const res = await getCurrentUserInfo()
    this.userInfo = res
    new WebSee(res?.userName)
    await this.getUserRoleMenu()
  }

  setUserInfo(user: Partial<User.UserEntity>) {
    this.userInfo = user
  }

  async getUserRoleMenu() {
    const res = await getMenuList()
    this.userRoleMenu = res
  }
}

export const storeGlobalUser = new GlobalUser()
