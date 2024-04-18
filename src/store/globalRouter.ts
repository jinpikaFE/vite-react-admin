import { getCurrentUserInfo } from '@/apis/accessManagement/user'
import { WebSee } from '@/utils/webSee'
import { RouteType } from '@config/routes'
import { makeAutoObservable } from 'mobx'

class GlobalRouter {
  loading = true
  routers: RouteType[] = []
  constructor() {
    makeAutoObservable(this)
  }

  setRouters(routers: RouteType[]) {
    this.routers = routers
  }
  setLoading(loading: boolean) {
    this.loading = loading
  }
}

export const storeGlobalRouter = new GlobalRouter()
