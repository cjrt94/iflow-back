export default {
  ADD_ITEM (state, item) {
    state.products.unshift(item)
  },
  SET_PRODUCTS (state, products) {
    state.products = products
  },
  UPDATE_PRODUCT (state, product) {
    console.log(product)
    const productIndex = state.products.findIndex((o) => o.id === product.id)
    Object.assign(state.products[productIndex], product)
  },
  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.products.findIndex((p) => p.id === itemId)
    state.products.splice(ItemIndex, 1)
  }
}
