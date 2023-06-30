import http from '@/server'

/** 获取当前登录用户信息 */
export async function getCurrentUserInfo() {
  return http.request({
    url: '/api/v1/admin/info',
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
    url: `/api/v1/admin/update/${data?.id}`,
    method: 'post',
    data
  })
}

export async function delUser(data: Pick<User.UserEntity, 'id'>) {
  return http.request({
    url: `/api/v1/admin/delete/${data?.id}`,
    method: 'post'
  })
}
