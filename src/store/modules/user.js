
const state = {
  // token: localStorage.getItem('token'),
  userinfo: {}
}

const mutations = {
  // setToken(state, token) {
  //   localStorage.setItem('token', token)
  //   state.token = token
  // },
  // removeToken(state) {
  //   localStorage.removeItem('token')
  //   state.token = null
  // },
  setUserinfo(state, userinfo) {
    localStorage.setItem('userinfo', userinfo)
    state.userinfo = userinfo
  },
  removeUserinfo(state) {
    localStorage.removeItem('userinfo')
    state.userinfo = {}
  }

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
