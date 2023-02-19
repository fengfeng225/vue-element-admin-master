import Layout from '@/layout/index.vue'

export default {
  path: '/permission',
  name: 'permission',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理' // 为左侧渲染的名称
    }
  }]
}
