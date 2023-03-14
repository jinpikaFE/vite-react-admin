import http from '@/server/'

export async function getData(data?: { url: string; check_token: string }) {
  return http.request({
    url: '/api/users',
    method: 'get',
    data
  })
}
