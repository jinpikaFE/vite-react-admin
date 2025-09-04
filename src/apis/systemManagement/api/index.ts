import http from '@/server'

/** 获取API列表 */
export async function getApiList(params?: ApiManagement.ApiListParams) {
  return http.request<Global.PageResponse<ApiManagement.ApiEntity>>({
    url: '/api/v1/sys-api',
    method: 'get',
    params
  })
}

/** 获取API详情 */
export async function getApiDetail(apiId: number) {
  return http.request<ApiManagement.ApiEntity>({
    url: `/api/v1/sys-api/${apiId}`,
    method: 'get'
  })
}

/** 更新API */
export async function updateApi(apiId: number, data: Partial<ApiManagement.ApiEntity>) {
  return http.request({
    url: `/api/v1/sys-api/${apiId}`,
    method: 'put',
    data
  })
}
