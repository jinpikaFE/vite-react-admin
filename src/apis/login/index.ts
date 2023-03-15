import http from '@/server'

export async function login(data?: Login.LoginEntity) {
  return http.request({
    url: '/api/v1/admin/login',
    method: 'post',
    data
  })
}
