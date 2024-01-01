export default {
  ADD_ITEM(state, item) {
    state.users.unshift(item)
  },
  SET_USERS(state, users) {
    state.users = users
  },
  UPDATE_USER(state, user) {
    const userIndex = state.users.findIndex((u) => u.id === user.id)
    Object.assign(state.users[userIndex], user)
  },
  REMOVE_ITEM(state, itemId) {
    const ItemIndex = state.users.findIndex((u) => u.id === itemId)
    state.users.splice(ItemIndex, 1)
  }
}