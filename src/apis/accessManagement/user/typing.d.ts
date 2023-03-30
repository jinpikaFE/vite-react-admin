declare namespace User {
  type UserEntity = {
    password: string
    username: string
    nickName: string
    icon: string
    note: string
    email: string
  }

  type UserListParams = {
    /** 关键词 */
    keyword?: string
  } & Global.PageParams
}
