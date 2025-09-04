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
    hideInMenu?: string
    /** 是否隐藏布局 （0: 显示, 1: 隐藏） */
    hideLayout?: string
    /** 是否外链 */
    isFrame?: string
    /** 关联系统API */
    sysApi?: any[]
    /** 关联API列表 */
    apis?: number[]
    /** 数据权限范围 */
    dataScope?: string
    /** 额外参数 */
    params?: string
    /** 角色ID */
    roleId?: number
    /** 是否选中 */
    is_select?: boolean
    /** 子菜单 */
    children?: MenuEntity[]
  } & Common.CommonEntity

  type MenuListParams = {
    /** 页码 */
    pageIndex?: number
    /** 每页大小 */
    pageSize?: number
    /** 菜单名称 */
    menuName?: string
    /** 菜单标题 */
    title?: string
    /** 菜单类型 */
    menuType?: string
    /** 父级菜单ID */
    parentId?: number
    /** 是否可见 */
    visible?: string
    /** 排序字段 */
    sort?: string
  }

  type MenuLabel = {
    /** 菜单ID */
    id: number
    /** 菜单标题 */
    label: string
    /** 子菜单 */
    children?: MenuLabel[]
  }

  /** 菜单角色关联 */
  type MenuRole = MenuEntity & {
    /** 是否选中 */
    is_select: boolean
  }

  /** 菜单删除请求参数 */
  type MenuDeleteReq = {
    /** 菜单ID列表 */
    ids: number[]
  }

  /** API实体 */
  type ApiEntity = {
    /** API ID */
    id: number
    /** API标题 */
    title: string
    /** API路径 */
    path: string
    /** 请求方法 */
    action: string
    /** API类型 */
    type: string
    /** 处理函数 */
    handle: string
  }

  /** 分配API请求参数 */
  type AssignApisReq = {
    /** API ID数组 */
    apis: number[]
  }
}
