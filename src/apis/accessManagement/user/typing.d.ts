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
  }

  type UserListParams = {
    /** 关键词 */
    keyword?: string
  } & Global.PageParams

  type RoleMenuEntity = Menu.MenuEntity & {
    children?: Menu.MenuEntity[]
  }
}
