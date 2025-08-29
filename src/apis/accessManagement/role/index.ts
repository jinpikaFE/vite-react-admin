import http from '@/server'

/** 获取角色列表 */
export async function getRoleList(params: Role.RoleListParams) {
  return http.request<Global.PageResponse<Role.RoleEntity>>({
    url: '/api/v1/role',
    method: 'get',
    params
  })
}

/** 获取角色详情 */
export async function getRoleDetail(roleId: number) {
  return http.request<Role.RoleEntity>({
    url: `/api/v1/role/${roleId}`,
    method: 'get'
  })
}

/** 添加角色 */
export async function addRole(data: Role.RoleEntity) {
  return http.request({
    url: '/api/v1/role',
    method: 'post',
    data
  })
}

/** 编辑角色 */
export async function editRole(data: Role.RoleEntity) {
  return http.request({
    url: `/api/v1/role/${data?.roleId}`,
    method: 'put',
    data
  })
}

/** 批量删除角色 */
export async function delRole(params: { ids: number[] }) {
  return http.request({
    url: '/api/v1/role',
    method: 'delete',
    data: params
  })
}

/** 修改角色状态 */
export async function editRoleStatus(params: Role.RoleStatusReq) {
  return http.request({
    url: '/api/v1/role-status',
    method: 'put',
    data: params
  })
}

/** 获取角色菜单树选择器 */
export async function getRoleMenuTreeSelect(roleId: number) {
  return http.request<{ menus: Menu.MenuLabel[] }>({
    url: `/api/v1/roleMenuTreeselect/${roleId}`,
    method: 'get'
  })
}

/** 更新角色数据权限 */
export async function updateRoleDataScope(data: Role.RoleDataScopeReq) {
  return http.request({
    url: '/api/v1/roledatascope',
    method: 'put',
    data
  })
}
