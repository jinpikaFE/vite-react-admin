declare namespace User {
  type UserEntity = {
    /**
     * 邮箱
     */
    email?: string
    /**
     * 用户头像
     */
    icon?: string
    id?: number
    /**
     * 用户昵称
     */
    nickName?: string
    /**
     * 备注
     */
    note?: string
    /**
     * 密码
     */
    password: string
    /**
     * 角色ids
     */
    roleIds?: number[]
    roles?: Role.RoleEntity[]
    /**
     * 帐号启用状态：0->禁用；1->启用
     */
    status?: number
    /**
     * 用户名
     */
    username: string
    menus?: Menu.MenuEntity[]
  }

  type UserListParams = {
    /** 关键词 */
    keyword?: string
  } & Global.PageParams
}
