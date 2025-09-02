import { storeGlobalUser } from '@/store/globalUser'
import { useEffect, useState } from 'react'

/**
 * 权限控制Hook
 * 提供路径权限、按钮权限、角色权限的检查功能
 */
export const usePermission = () => {
  const [userInfo, setUserInfo] = useState(storeGlobalUser.userInfo)
  const [userRoleMenu, setUserRoleMenu] = useState(storeGlobalUser.userRoleMenu)

  useEffect(() => {
    // 监听用户信息变化
    const updateUserInfo = () => {
      setUserInfo({ ...storeGlobalUser.userInfo })
      setUserRoleMenu([...storeGlobalUser.userRoleMenu])
    }

    // 初始设置
    updateUserInfo()

    // 这里可以添加mobx的observer或者其他状态监听机制
    // 由于使用了mobx，可以通过observer包装组件来自动响应变化

    return () => {
      // 清理函数
    }
  }, [])

  /**
   * 检查路径权限
   * @param path 要检查的路径
   * @returns 是否有权限
   */
  const hasMenuNamePermission = (path: string): boolean => {
    return storeGlobalUser.hasMenuNamePermission(path)
  }

  /**
   * 检查按钮权限
   * @param permission 权限标识
   * @returns 是否有权限
   */
  const hasButtonPermission = (permission: string): boolean => {
    return storeGlobalUser.hasButtonPermission(permission)
  }

  /**
   * 检查角色权限
   * @param role 角色标识
   * @returns 是否有权限
   */
  const hasRole = (role: string): boolean => {
    return storeGlobalUser.hasRole(role)
  }

  /**
   * 检查多个权限（AND逻辑）
   * @param permissions 权限标识数组
   * @returns 是否拥有所有权限
   */
  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasButtonPermission(permission))
  }

  /**
   * 检查多个权限（OR逻辑）
   * @param permissions 权限标识数组
   * @returns 是否拥有任一权限
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasButtonPermission(permission))
  }

  /**
   * 检查多个角色（AND逻辑）
   * @param roles 角色标识数组
   * @returns 是否拥有所有角色
   */
  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every(role => hasRole(role))
  }

  /**
   * 检查多个角色（OR逻辑）
   * @param roles 角色标识数组
   * @returns 是否拥有任一角色
   */
  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => hasRole(role))
  }

  return {
    userInfo,
    userRoleMenu,
    hasMenuNamePermission,
    hasButtonPermission,
    hasRole,
    hasAllPermissions,
    hasAnyPermission,
    hasAllRoles,
    hasAnyRole
  }
}

/**
 * 权限控制组件
 * 根据权限条件决定是否渲染子组件
 */
interface PermissionProps {
  /** 子组件 */
  children: React.ReactNode
  /** 需要的路由菜单权限 */
  menuName?: string
  /** 需要的按钮权限 */
  permission?: string
  /** 需要的按钮权限数组（AND逻辑） */
  permissions?: string[]
  /** 需要的按钮权限数组（OR逻辑） */
  anyPermissions?: string[]
  /** 需要的角色 */
  role?: string
  /** 需要的角色数组（AND逻辑） */
  roles?: string[]
  /** 需要的角色数组（OR逻辑） */
  anyRoles?: string[]
  /** 权限不足时的替代内容 */
  fallback?: React.ReactNode
}

export const PermissionGuard: React.FC<PermissionProps> = ({
  children,
  menuName,
  permission,
  permissions,
  anyPermissions,
  role,
  roles,
  anyRoles,
  fallback = null
}) => {
  const {
    hasMenuNamePermission,
    hasButtonPermission,
    hasRole,
    hasAllPermissions,
    hasAnyPermission,
    hasAllRoles,
    hasAnyRole
  } = usePermission()

  // 检查路径权限
  if (menuName && !hasMenuNamePermission(menuName)) {
    return fallback
  }

  // 检查单个按钮权限
  if (permission && !hasButtonPermission(permission)) {
    return fallback
  }

  // 检查多个按钮权限（AND逻辑）
  if (permissions && !hasAllPermissions(permissions)) {
    return fallback
  }

  // 检查多个按钮权限（OR逻辑）
  if (anyPermissions && !hasAnyPermission(anyPermissions)) {
    return fallback
  }

  // 检查单个角色
  if (role && !hasRole(role)) {
    return fallback
  }

  // 检查多个角色（AND逻辑）
  if (roles && !hasAllRoles(roles)) {
    return fallback
  }

  // 检查多个角色（OR逻辑）
  if (anyRoles && !hasAnyRole(anyRoles)) {
    return fallback
  }

  return children
}
