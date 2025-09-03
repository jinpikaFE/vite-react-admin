/**
 * 菜单名称常量
 * 用于权限控制的菜单名称定义
 */
export const MENU_NAMES = {
  // 首页
  HOME: 'Home',

  // 登录页面
  LOGIN: 'Login',

  // 嵌套路由
  FIRST: 'Frist',
  FIRST_ONE: 'Frist-1',
  FIRST_ONE_CHILD: 'Frist-1-2',
  FIRST_TWO: 'Frist-2',
  HIDE_IN_MENU: 'HideInMenu',

  // 系统管理
  SYSTEM_MANAGEMENT: 'Admin',
  SYS_USER_MANAGEMENT: 'SysUserManage',
  SYS_ROLE_MANAGEMENT: 'SysRoleManage',
  SYS_DEPT_MANAGEMENT: 'SysDeptManage',
  SYS_MENU_MANAGEMENT: 'SysMenuManage',

  // 布局隐藏
  LAYOUT_NONE: 'LayoutNone'
} as const

/**
 * 菜单名称类型
 */
export type MenuNameType = (typeof MENU_NAMES)[keyof typeof MENU_NAMES]

/**
 * 菜单名称与中文名称的映射
 */
export const MENU_NAME_LABELS: Record<MenuNameType, string> = {
  [MENU_NAMES.HOME]: '首页',
  [MENU_NAMES.LOGIN]: '登录',
  [MENU_NAMES.FIRST]: '嵌套路由',
  [MENU_NAMES.FIRST_ONE]: '一级-1',
  [MENU_NAMES.FIRST_ONE_CHILD]: '一级-1-二级',
  [MENU_NAMES.FIRST_TWO]: '一级-2',
  [MENU_NAMES.HIDE_IN_MENU]: '隐藏菜单',
  [MENU_NAMES.SYSTEM_MANAGEMENT]: '系统管理',
  [MENU_NAMES.SYS_USER_MANAGEMENT]: '用户管理',
  [MENU_NAMES.SYS_ROLE_MANAGEMENT]: '角色管理',
  [MENU_NAMES.SYS_DEPT_MANAGEMENT]: '部门管理',
  [MENU_NAMES.SYS_MENU_MANAGEMENT]: '菜单管理',
  [MENU_NAMES.LAYOUT_NONE]: '布局隐藏'
}

/**
 * 获取菜单名称对应的中文标签
 * @param menuName 菜单名称
 * @returns 中文标签
 */
export const getMenuLabel = (menuName: MenuNameType): string => {
  return MENU_NAME_LABELS[menuName] || menuName
}

/**
 * 检查是否为有效的菜单名称
 * @param menuName 菜单名称
 * @returns 是否有效
 */
export const isValidMenuName = (menuName: string): menuName is MenuNameType => {
  return Object.values(MENU_NAMES).includes(menuName as MenuNameType)
}
