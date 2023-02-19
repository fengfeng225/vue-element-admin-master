import Layout from '@/layout/index.vue'

export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤' // 为左侧渲染的名称
    }
  }]
}
