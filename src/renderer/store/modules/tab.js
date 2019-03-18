const state = {
  index: 0
}

const mutations = {
  SET_TAB_INDEX(state, {index}) {
    state.index = index;
  }
}

const actions = {
  set_tab_index({ commit }, index) {
    commit('SET_TAB_INDEX', index)
  }
}

export default {
  namespaces: true,
  state,
  mutations,
  actions
}
