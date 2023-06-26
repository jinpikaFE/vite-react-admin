import http from '@/server'

/** 获取角色列表 */
export async function getRoleList(params: Role.RoleListParams) {
  return http.request({
    url: '/api/v1/role/list',
    method: 'get',
    params
  })
}
