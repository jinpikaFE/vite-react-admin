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
