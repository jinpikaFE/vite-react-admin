import { getCurrentUserInfo } from '@/apis/accessManagement/user'
import { WebSee } from '@/utils/webSee'
import { RouteType } from '@config/routes'
import { makeAutoObservable } from 'mobx'

class GlobalRouter {
  routers: RouteType[] = []
  constructor() {
    makeAutoObservable(this)
  }

  setRouters(routers: RouteType[]) {
    this.routers = routers
  }
}

export const storeGlobalRouter = new GlobalRouter()
