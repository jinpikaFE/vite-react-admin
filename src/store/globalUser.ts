import { getCurrentUserInfo, getMenuList } from '@/apis/accessManagement/user'
import { WebSee } from '@/utils/webSee'
import { makeAutoObservable } from 'mobx'
import { logout } from '@/apis/login'
import { storage } from '@/utils/Storage'

class GlobalUser {
  userInfo: Partial<User.UserEntity> = {}
  userRoleMenu: User.RoleMenuEntity[] = []
  // 缓存用户可访问的路径
  accessibleMenuNames: Set<string> = new Set()
  constructor() {
    makeAutoObservable(this)
  }

  async getUserDetail() {
    const res = await getCurrentUserInfo()
    this.userInfo = res
    new WebSee(res?.username)
    await this.getUserRoleMenu()
  }

  setUserInfo(user: Partial<User.UserEntity>) {
    this.userInfo = user
  }

  async getUserRoleMenu() {
    const res = await getMenuList()
    this.userRoleMenu = res
    // 更新可访问路径缓存
    this.updateAccessiblePaths()
    console.log(this.accessibleMenuNames, 'this.accessibleMenuNames,')
  }

  /**
   * 更新用户可访问的路径缓存
   */
  private updateAccessiblePaths() {
    this.accessibleMenuNames.clear()

    const extractPaths = (menus: User.RoleMenuEntity[]) => {
      menus.forEach(menu => {
        if (menu.path && menu.menuType !== 'F') {
          // 不是按钮类型的菜单
          this.accessibleMenuNames.add(menu.menuName)
        }
        if (menu.children) {
          extractPaths(menu.children)
        }
      })
    }

    extractPaths(this.userRoleMenu)
  }

  /**
   * 检查用户是否有权限访问指定路径
   * @param menuName 要检查的菜单名
   * @returns 是否有权限
   */
  hasMenuNamePermission(menuName: string): boolean {
    // 超级管理员或无权限限制的路径
    if (this.isSuperAdmin() || this.isPublicPath(menuName)) {
      return true
    }

    // 检查精确匹配
    if (this.accessibleMenuNames.has(menuName)) {
      return true
    }

    return false
  }

  /**
   * 检查用户是否有按钮权限
   * @param permission 权限标识
   * @returns 是否有权限
   */
  hasButtonPermission(permission: string): boolean {
    if (this.isSuperAdmin()) {
      return true
    }

    return this.userInfo.permissions?.includes(permission) || false
  }

  /**
   * 检查用户是否有角色权限
   * @param role 角色标识
   * @returns 是否有权限
   */
  hasRole(role: string): boolean {
    if (this.isSuperAdmin()) {
      return true
    }

    return this.userInfo.roles?.includes(role) || false
  }

  /**
   * 判断是否为超级管理员
   * @returns 是否为超级管理员
   */
  private isSuperAdmin(): boolean {
    return (
      this.userInfo.roles?.includes('admin') ||
      this.userInfo.roles?.includes('super_admin') ||
      false
    )
  }

  /**
   * 判断是否为公开路径（无需权限验证）
   * @param path 路径
   * @returns 是否为公开路径
   */
  private isPublicPath(path: string): boolean {
    const publicPaths = [
      '/login',
      '/404',
      '/403',
      '/500',
      '/home' // 首页通常对所有登录用户开放
    ]

    return publicPaths.some(publicPath => path === publicPath || path.startsWith(publicPath + '/'))
  }

  /**
   * 清除用户信息和权限缓存
   */
  clearUserData() {
    this.userInfo = {}
    this.userRoleMenu = []
    this.accessibleMenuNames.clear()
  }

  async globalLogout() {
    try {
      await logout()
    } finally {
      this.clearUserData()
      storage.clear()
    }
  }
}

export const storeGlobalUser = new GlobalUser()
