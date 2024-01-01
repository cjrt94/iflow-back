export default {
  fetchProducts ({ commit }, data) {
    commit('SET_PRODUCTS', data.products)
  },
  addProduct ({ commit }, data) {
    commit('ADD_ITEM', data.product)
  },
  updateProduct ({ commit }, data) {
    commit('UPDATE_PRODUCT', data.product)
  },
}
