import http from '@/server'

export async function login(data?: Login.LoginEntity) {
  return http.request<Login.LoginResponse>({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

export async function getCaptcha() {
  return http.request({
    url: '/api/v1/captcha',
    method: 'get'
  })
}

export async function logout() {
  return http.request({
    url: '/api/v1/logout',
    method: 'post'
  })
}