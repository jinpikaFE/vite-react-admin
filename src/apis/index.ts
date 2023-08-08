import http from '@/server'

const VITE_JINPIKAAI_URL = import.meta.env.VITE_JINPIKAAI_URL

export async function getData(data?: { url: string; check_token: string }) {
  return http.request({
    url: '/api/users',
    method: 'get',
    data
  })
}

export async function uploadFile(data?: any) {
  return http.request({
    url: '/api/v1/cos/upload',
    method: 'post',
    data,
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
