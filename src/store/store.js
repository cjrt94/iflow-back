import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

import moduleUsers from './users/moduleDataList.js'
import moduleProducts from './products/moduleDataList.js'
import moduleAuth from './auth/moduleAuth.js'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    users: moduleUsers,
    products: moduleProducts
  },
  strict: false
})
