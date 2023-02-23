import Layout from '@/layout/index.vue'

export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批', // 为左侧渲染的名称
      icon: 'tree-table'
    }
  }]
}
