const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username, // 建立对用户名的快捷访问，如果初始值是null，则会报错； {} 就不会，返回undefined
  staffPhoto: state => state.user.userInfo.staffPhoto
}
export default getters
