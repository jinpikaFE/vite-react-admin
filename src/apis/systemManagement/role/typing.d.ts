declare namespace Role {
  type RoleEntity = {
    /** 角色ID */
    roleId: number
    /** 角色名称 */
    roleName: string
    /**
     * 角色状态
     * 1：禁用
     * 2：启用
     */
    status: '1' | '2'
    /** 角色权限字符串 */
    roleKey: string
    /** 角色排序 */
    roleSort: number
    /** 标记（预留字段） */
    flag?: string
    /** 备注 */
    remark?: string
    /** 是否为管理员 */
    admin?: boolean
    /** 数据权限范围 */
    dataScope?: string
    /** 额外参数 */
    params?: string
    /** 菜单ID集合 */
    menuIds?: number[]
    /** 部门ID集合 */
    deptIds?: number[]
    /** 关联部门对象 */
    sysDept?: any[]
    /** 关联菜单对象数组 */
    sysMenu?: any[]
  } & Common.CommonEntity

  type RoleListParams = {
    /** 关键词 */
    roleName?: string
    status?: string
    roleKey?: string
    /** 角色排序 */
    roleSort?: number
    /** 标记 */
    flag?: string
    /** 备注 */
    remark?: string
    /** 是否管理员 */
    admin?: boolean
    /** 数据权限范围 */
    dataScope?: string
    sysMenu?: Menu.MenuEntity[]
  } & Global.PageParams

  /** 角色数据权限请求参数 */
  type RoleDataScopeReq = {
    /** 角色ID */
    roleId: number
    /** 数据权限范围 */
    dataScope: string
    /** 部门ID列表 */
    deptIds?: number[]
  }

  /** 角色状态更新请求参数 */
  type RoleStatusReq = {
    /** 角色ID */
    roleId: number
    /** 状态 */
    status: '1' | '2'
  }

  /** 角色删除请求参数 */
  type RoleDeleteReq = {
    /** 角色ID列表 */
    ids: number[]
  }
}
