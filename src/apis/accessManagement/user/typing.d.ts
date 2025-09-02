declare namespace User {
  type UserEntity = {
    /** 用户头像URL */
    avatar: string
    /** 按钮权限标识列表 */
    buttons: string[]

    /** 所属部门ID */
    deptId: number
    /** 个人简介 */
    introduction: string
    /** 用户姓名 */
    nickName: string
    /** 用户名 */
    username: string
    /** 接口权限标识列表 */
    permissions: string[]
    /** 角色列表 */
    roles: string[]
    /** 角色ID列表 */
    roleIds: number[]
    roleNames: string[]
    /** 用户ID */
    userId: number
    /** 状态 */
    status: '1' | '2' // 1 禁用 2 启用
    /** 性别 */
    sex: '1' | '2' // 1 男 2 女
    /** 手机号 */
    phone: string
    /** 邮箱 */
    email: string
    /** 备注 */
    remark: string
    /** 创建时间 */
    createdAt: string
    /** 更新时间 */
    updatedAt: string
    /** 部门信息 */
    dept?: Dept.DeptEntity
  }

  /** 新增用户请求参数 */
  type UserInsertReq = {
    username: string
    nickName: string
    email: string
    password: string
    avatar?: string
    roleIds: number[]
    remark?: string
    status: '1' | '2'
    deptId?: number
    phone?: string
    sex?: '1' | '2'
  }

  /** 编辑用户请求参数 */
  type UserUpdateReq = {
    userId: number
    username?: string
    nickName?: string
    email?: string
    avatar?: string
    roleIds?: number[]
    remark?: string
    status?: '1' | '2'
    deptId?: number
    phone?: string
    sex?: '1' | '2'
  }

  type UserListParams = {
    /** 关键词 */
    username?: string
    /** 部门ID */
    deptId?: number
  } & Global.PageParams

  type RoleMenuEntity = Menu.MenuEntity & {
    children?: Menu.MenuEntity[]
  }
}
