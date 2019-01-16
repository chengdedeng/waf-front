const state = {
  contentPageName: '',
  upstreamTable: []
}

const mutations = {
  setContentPageName (state, name, rootState) {
    state.contentPageName = name
  },
  setUpstreamTable (state, upstreamTable, rootState) {
    state.upstreamTable = upstreamTable
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
