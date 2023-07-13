import http from '@/server'

/** 获取组件树 */
export async function getComponTree() {
  return http.request({
    url: '/api/v1/menu/treeList',
    method: 'get'
  })
}

/** 删除组件 */
export async function delCompon({ id }: Pick<Compon.ComponEntity, 'id'>) {
  return http.request({
    url: `/api/v1/menu/delete/${id}`,
    method: 'post'
  })
}

/** 编辑组件 */
export async function editCompon({ id, ...extraData }: Compon.ComponEntity) {
  return http.request({
    url: `/api/v1/menu/update/${id}`,
    method: 'post',
    data: extraData
  })
}

/** 添加组件 */
export async function addCompon(data: Compon.ComponEntity) {
  return http.request({
    url: '/api/v1/menu/create',
    method: 'post',
    data
  })
}
