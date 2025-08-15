import http from '@/server'

const VITE_JINPIKAAI_URL = import.meta.env.VITE_JINPIKAAI_URL

export async function getData(data?: { url: string; check_token: string }) {
  return http.request({
    url: '/api/users',
    method: 'get',
    data
  })
}

export async function uploadFile(
  data?: any,
  params?: {
    type?: string // @Param type query string true "type" (1：单图，2：多图, 3：base64图片)
    source?: string // @Param source query string true "source" (1：本地，2：阿里云，3：七牛云，4：腾讯云COS)
  }
) {
  return http.request<Common.UploadFileResponse>({
    url: '/api/v1/public/uploadFile',
    method: 'post',
    data,
    params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

/** 获取ip信息 */
export async function getIpInfo() {
  return http.request({
    url: '/api/common/ipInfo',
    method: 'get',
    baseURL: VITE_JINPIKAAI_URL
  })
}
