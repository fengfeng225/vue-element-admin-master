import request from '@/utils/request'

/**
 * 获取员工列表的简单接口
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
