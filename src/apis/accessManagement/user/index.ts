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

export async function getUserList(params: User.UserListParams) {
  return http.request({
    url: '/api/v1/admin/list',
    method: 'get',
    params
  })
}

export async function addUser(data: User.UserEntity) {
  return http.request({
    url: '/api/v1/admin/register',
    method: 'post',
    data
  })
}

export async function editUser(data: Partial<User.UserEntity>) {
  return http.request({
    url: `/api/v1/admin/update/${data?.userId}`,
    method: 'post',
    data
  })
}

export async function delUser(data: Pick<User.UserEntity, 'userId'>) {
  return http.request({
    url: `/api/v1/admin/delete/${data?.userId}`,
    method: 'post'
  })
}
