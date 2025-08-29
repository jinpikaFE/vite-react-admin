import http from '@/server'

/** 获取菜单列表 */
export async function getMenuList(params: Menu.MenuListParams) {
  return http.request<Menu.MenuEntity[]>({
    url: '/api/v1/menu',
    method: 'get',
    params
  })
}

/** 获取菜单树形结构 */
export async function getMenuTree(params?: Menu.MenuListParams) {
  return http.request<Menu.MenuLabel[]>({
    url: '/api/v1/menu',
    method: 'get',
    params
  })
}

/** 获取菜单详情 */
export async function getMenuDetail(menuId: number) {
  return http.request<Menu.MenuEntity>({
    url: `/api/v1/menu/${menuId}`,
    method: 'get'
  })
}

/** 添加菜单 */
export async function addMenu(data: Partial<Menu.MenuEntity>) {
  return http.request({
    url: '/api/v1/menu',
    method: 'post',
    data
  })
}

/** 编辑菜单 */
export async function editMenu(menuId: number, data: Partial<Menu.MenuEntity>) {
  return http.request({
    url: `/api/v1/menu/${menuId}`,
    method: 'put',
    data
  })
}

/** 删除菜单 */
export async function delMenu(menuId: number) {
  return http.request({
    url: '/api/v1/menu',
    method: 'delete',
    data: { ids: [menuId] }
  })
}

/** 批量删除菜单 */
export async function delMenuBatch(menuIds: number[]) {
  return http.request({
    url: '/api/v1/menu',
    method: 'delete',
    data: { ids: menuIds }
  })
}

/** 获取菜单标签（用于角色分配菜单） */
export async function getMenuLabels() {
  return http.request<{ menus: Menu.MenuLabel[] }>({
    url: '/api/v1/roleMenuTreeselect/0',
    method: 'get'
  })
}

/** 根据角色获取菜单 */
export async function getMenusByRole(roleName: string) {
  return http.request<Menu.MenuEntity[]>({
    url: '/api/v1/menurole',
    method: 'get',
    params: { roleName }
  })
}

/** 根据角色ID列表获取合并菜单 */
export async function getMenusByRoleIds(roleIds: number[]) {
  return http.request<Menu.MenuEntity[]>({
    url: '/api/v1/multi-role',
    method: 'get',
    params: { roleIds }
  })
}

