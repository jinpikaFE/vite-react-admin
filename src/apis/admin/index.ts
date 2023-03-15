import http from '@/server'

export async function getCurrentUserInfo() {
  return http.request({
    url: '/api/v1/admin/info',
    method: 'get'
  })
}
