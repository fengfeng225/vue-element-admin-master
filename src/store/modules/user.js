import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { login } from '@/api/user.js'

export default {
  namespaced: true,
  state: {
    token: getToken() // 初始化 从缓存中读取状态
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    }
  },
  actions: {
    async login(context, data) {
      // 调用api接口
      const result = await login(data) // 拿到token
      context.commit('setToken', result)
    }
  }
}
