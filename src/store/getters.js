const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username, // 建立对用户名的快捷访问，如果初始值是null，则会报错； {} 就不会，返回undefined
  staffPhoto: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  routes: state => state.permission.routes, // 建立左侧菜单栏的快捷访问
  userId: state => state.user.userInfo.userId
}
export default getters
