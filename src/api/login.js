import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/employee/login',
    method: 'POST',
    data
  })
}

export function logout() {
  return request({
    url: '/employee/logout',
    method: 'POST'
  })
}
