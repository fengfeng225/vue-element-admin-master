import Layout from '@/layout/index.vue'

export default {
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构', // 为左侧渲染的名称
      icon: 'tree'
    }
  }]
}
