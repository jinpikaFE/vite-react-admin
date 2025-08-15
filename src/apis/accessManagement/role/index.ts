import http from '@/server'

/** 获取角色列表 */
export async function getRoleList(params: Role.RoleListParams) {
  return http.request<Global.PageResponse<Role.RoleEntity>>({
    url: '/api/v1/role',
    method: 'get',
    params
  })
}

/** 添加角色 */
export async function addRole(data: Role.RoleEntity) {
  return http.request({
    url: '/api/v1/role/create',
    method: 'post',
    data
  })
}

/** 编辑角色 */
export async function editRole(data: Role.RoleEntity) {
  return http.request({
    url: `/api/v1/role/update/${data?.roleId}`,
    method: 'post',
    data
  })
}

/** 批量删除角色 */
export async function delRole(params: { ids: string[] }) {
  return http.request({
    url: '/api/v1/role/delete',
    method: 'delete',
    params
  })
}

/** 修改角色状态 */
export async function editRoleStatus(params: Pick<Role.RoleEntity, 'roleId' | 'status'>) {
  return http.request({
    url: `/api/v1/role/updateStatus/${params?.roleId}`,
    method: 'post',
    params
  })
}
