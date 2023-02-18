import request from '@/utils/request'

/**
 * 这是登录接口
 * **/
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {}

export function logout() {}
