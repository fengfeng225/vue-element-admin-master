// 建立一个权限路由的模块
import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    // state.routes = constantRoutes.concat(newRoutes)
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // menus 获取用户资料中的权限标识
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRoutes', routes)
    return routes // 就是当前用户的动态路由
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
