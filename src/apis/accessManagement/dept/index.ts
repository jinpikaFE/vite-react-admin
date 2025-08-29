import http from '@/server'

/** 获取部门列表 */
export async function getDeptList(params: Dept.DeptListParams) {
  return http.request<Dept.DeptEntity[]>({
    url: '/api/v1/dept',
    method: 'get',
    params
  })
}

/** 获取部门树形结构 */
export async function getDeptTree(params?: Dept.DeptListParams) {
  return http.request<Dept.DeptLabel[]>({
    url: '/api/v1/deptTree',
    method: 'get',
    params
  })
}

/** 获取部门详情 */
export async function getDeptDetail(deptId: number) {
  return http.request<Dept.DeptEntity>({
    url: `/api/v1/dept/${deptId}`,
    method: 'get'
  })
}

/** 添加部门 */
export async function addDept(data: Partial<Dept.DeptEntity>) {
  return http.request({
    url: '/api/v1/dept',
    method: 'post',
    data
  })
}

/** 编辑部门 */
export async function editDept(deptId: number, data: Partial<Dept.DeptEntity>) {
  return http.request({
    url: `/api/v1/dept/${deptId}`,
    method: 'put',
    data
  })
}

/** 删除部门 */
export async function delDept(deptId: number) {
  return http.request({
    url: '/api/v1/dept',
    method: 'delete',
    data: { ids: [deptId] }
  })
}
