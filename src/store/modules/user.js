import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth.js'
import { login, getUserInfo, getUserDetailById } from '@/api/user.js'

export default {
  namespaced: true,
  state: {
    token: getToken(), // 初始化 从缓存中读取状态
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, result) {
      state.userInfo = { ...result }
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(context, data) {
      // 调用api接口
      const result = await login(data) // 拿到token
      context.commit('setToken', result)
      setTimeStamp()
    },
    async getUserInfo(context) {
      const result = await getUserInfo()
      const baseInfo = await getUserDetailById(result.userId)
      context.commit('setUserInfo', { ...result, ...baseInfo }) // 提交
      return result // 为后面权限模块伏笔
    },
    logout(context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
    }
  }
}
