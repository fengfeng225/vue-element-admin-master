import Layout from '@/layout/index.vue'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/employees'),
    meta: {
      title: '员工' // 为左侧渲染的名称
    }
  }]
}
