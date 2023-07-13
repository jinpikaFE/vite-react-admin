import http from '@/server'

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
