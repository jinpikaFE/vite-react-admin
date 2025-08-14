declare namespace Menu {
  type MenuEntity = {
    /** 菜单ID */
    menuId: number
    /** 菜单名称（英文标识） */
    menuName: string
    /** 菜单标题（中文显示） */
    title: string
    /** 菜单图标 */
    icon: string
    /** 路由路径 */
    path: string
    /** 路由全路径 */
    paths?: string
    /** 菜单类型（C: 菜单, M: 目录, F: 按钮） */
    menuType: string
    /** 操作动作 */
    action?: string
    /** 权限标识 */
    permission?: string
    /** 父级菜单ID */
    parentId?: number
    /** 是否缓存 */
    noCache?: boolean
    /** 面包屑导航 */
    breadcrumb?: string
    /** 组件路径 */
    component?: string
    /** 排序号 */
    sort?: number
    /** 是否可见（0: 显示, 1: 隐藏） */
    visible?: string
    /** 是否外链 */
    isFrame?: string
    /** 关联系统API */
    sysApi?: any
    /** 关联API列表 */
    apis?: any
    /** 数据权限范围 */
    dataScope?: string
    /** 额外参数 */
    params?: string
    /** 角色ID */
    RoleId?: number
    /** 是否选中 */
    is_select?: boolean
  } & Common.CommonEntity
}
