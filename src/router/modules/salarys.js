import Layout from '@/layout/index.vue'

export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/salarys'),
    meta: {
      title: '工资', // 为左侧渲染的名称
      icon: 'money'
    }
  }]
}
