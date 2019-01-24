const state = {
  contentPageName: '',
  upstreamTable: [],
  modalIsShow: false,
  modalCurrentView: ''
}

const mutations = {
  setContentPageName (state, name, rootState) {
    state.contentPageName = name
  },
  setUpstreamTable (state, upstreamTable, rootState) {
    state.upstreamTable = upstreamTable
  },
  CHANGE_MODAL_SHOW (state, isShow) {
    state.modalIsShow = isShow
  },
  CHANGE_MODAL_VIEW (state, view) {
    state.modalCurrentView = view
  }
}

const actions = {
  changeModalShow (context, state) {
    context.commit('CHANGE_MODAL_SHOW', state)
  },
  changeModalView (context, view) {
    context.commit('CHANGE_MODAL_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
