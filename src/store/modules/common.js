const state = {
  contentPageName: ''
}

const mutations = {
  setContentPageName (state, name, rootState) {
    state.contentPageName = name
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
