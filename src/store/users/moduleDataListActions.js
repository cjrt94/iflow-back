export default {
  fecthUsers({commit}, data) {
    commit('SET_USERS', data.users)
  },
  addUser({commit}, data) {
    commit('ADD_ITEM', data.user)
  },
  updateUser({commit}, data) {
    commit('UPDATE_USER', data.user)
  },
}