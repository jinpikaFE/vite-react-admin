import http from '@/server'

/** 获取当前登录用户信息 */
export async function getCurrentUserInfo() {
  return http.request<User.UserEntity>({
    url: '/api/v1/getinfo',
    method: 'get'
  })
}

/**根据登录角色名称获取菜单列表数据（左菜单使用） */
export async function getMenuList() {
  return http.request<User.RoleMenuEntity[]>({
    url: '/api/v1/menurole',
    method: 'get'
  })
}

/** 获取用户列表 */
export async function getUserList(params: User.UserListParams) {
  return http.request({
    url: '/api/v1/sys-user',
    method: 'get',
    params
  })
}

/** 添加用户 */
export async function addUser(data: User.UserInsertReq) {
  return http.request({
    url: '/api/v1/sys-user',
    method: 'post',
    data
  })
}

/** 编辑用户 */
export async function editUser(data: User.UserUpdateReq) {
  return http.request({
    url: '/api/v1/sys-user',
    method: 'put',
    data
  })
}

/** 删除用户 */
export async function delUser(data: Pick<User.UserEntity, 'userId'>) {
  return http.request({
    url: '/api/v1/sys-user',
    method: 'delete',
    data
  })
}

/** 更新用户状态 */
export async function updateUserStatus(data: Pick<User.UserEntity, 'userId' | 'status'>) {
  return http.request({
    url: '/api/v1/user/status',
    method: 'put',
    data
  })
}

/** 重置用户密码 */
export async function resetUserPassword(
  data: Pick<User.UserEntity, 'userId'> & { password: string }
) {
  return http.request({
    url: '/api/v1/user/pwd/reset',
    method: 'put',
    data
  })
}

/** 更新用户头像 */
export async function updateUserAvatar(data: Pick<User.UserEntity, 'userId'> & { avatar: string }) {
  return http.request({
    url: '/api/v1/user/avatar',
    method: 'post',
    data
  })
}
