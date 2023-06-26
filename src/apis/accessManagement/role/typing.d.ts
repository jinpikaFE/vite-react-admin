declare namespace Role {
  type RoleEntity = {
    password: string
    username: string
    nickName: string
    icon: string
    note: string
    email: string
  }

  type RoleListParams = {
    /** 关键词 */
    keyword?: string
  } & Global.PageParams
}
