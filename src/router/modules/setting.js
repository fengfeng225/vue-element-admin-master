import Layout from '@/layout/index.vue'

export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置' // 为左侧渲染的名称
    }
  }]
}
