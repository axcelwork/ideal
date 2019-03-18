const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  inc({ commit }) {
    // do something async
    console.log('inc')
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  namespaces: true,
  state,
  mutations,
  actions
}
