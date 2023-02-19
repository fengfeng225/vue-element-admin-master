import Layout from '@/layout/index.vue'

export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/social'),
    meta: {
      title: '社保' // 为左侧渲染的名称
    }
  }]
}
