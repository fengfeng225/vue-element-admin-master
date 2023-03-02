import Layout from '@/layout/index.vue'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '', // 为空 设为默认
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理', // 为左侧渲染的名称
      icon: 'people'
    }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/employees/detail.vue'),
    hidden: true,
    meta: {
      title: '员工详情'
    }
  }, {
    path: 'print/:id',
    component: () => import('@/views/employees/print.vue'),
    hidden: true,
    meta: {
      title: '员工打印'
    }
  }]
}
