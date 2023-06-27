import http from '@/server'

/** 获取所有资源分类列表 */
export async function getResourceCategoryList() {
  return http.request({
    url: '/api/v1/resourceCategory/listAll',
    method: 'get'
  })
}

/** 删除资源分类 */
export async function delResourceCategory({ id }: Pick<Resource.ResourceCategoryEntity, 'id'>) {
  return http.request({
    url: `/api/v1/resourceCategory/delete/${id}`,
    method: 'post'
  })
}

/** 编辑资源分类 */
export async function editResourceCategory({ id, ...extraData }: Resource.ResourceCategoryEntity) {
  return http.request({
    url: `/api/v1/resourceCategory/update/${id}`,
    method: 'post',
    data: extraData
  })
}

/** 添加资源分类 */
export async function addResourceCategory(data: Resource.ResourceCategoryEntity) {
  return http.request({
    url: '/api/v1/resourceCategory/create',
    method: 'post',
    data
  })
}

/** 获取所有资源列表 */
export async function getResourceList(params: Resource.ResourceListParams) {
  return http.request({
    url: '/api/v1/resource/list',
    method: 'get',
    params
  })
}

/** 删除资源分类 */
export async function delResource({ id }: Pick<Resource.ResourceEntity, 'id'>) {
  return http.request({
    url: `/api/v1/resource/delete/${id}`,
    method: 'post'
  })
}

/** 编辑资源分类 */
export async function editResource({ id, ...extraData }: Resource.ResourceEntity) {
  return http.request({
    url: `/api/v1/resource/update/${id}`,
    method: 'post',
    data: extraData
  })
}

/** 添加资源分类 */
export async function addResource(data: Resource.ResourceEntity) {
  return http.request({
    url: '/api/v1/resource/create',
    method: 'post',
    data
  })
}
