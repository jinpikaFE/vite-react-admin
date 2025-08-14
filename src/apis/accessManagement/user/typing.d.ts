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
   name: string
   /** 接口权限标识列表 */
   permissions: string[]
   /** 角色列表 */
   roles: string[]
   /** 用户ID */
   userId: number
   /** 用户名 */
   userName: string
   status: '1' | '2' // 1 启用 2 禁用
   /** 性别 */
   sex: '1' | '2' // 1 男 2 女
   /** 手机号 */
   phone: string
   /** 邮箱 */
   email: string
   /** 备注 */
  }

  type UserListParams = {
    /** 关键词 */
    username?: string
  } & Global.PageParams

  type RoleMenuEntity = Menu.MenuEntity & {
    children?: Menu.MenuEntity[]
  }
}
