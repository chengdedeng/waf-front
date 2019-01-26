const state = {
  contentPageName: '',
  upstreamTable: [],
  modalIsShow: false,
  modalCurrentView: ''
}

const mutations = {
  CHANGE_PAGE_NAME (state, name) {
    state.contentPageName = name
  },
  CHANGE_UPSTREAM_LIST_TABLE (state, upstreamTable) {
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
  changeModalShow (context, isShow) {
    context.commit('CHANGE_MODAL_SHOW', isShow)
  },
  changeModalView (context, view) {
    context.commit('CHANGE_MODAL_VIEW', view)
  },
  changePageName (context, name) {
    context.commit('CHANGE_PAGE_NAME', name)
  },
  changeUpstreamListTable (context, upstreamTable) {
    context.commit('CHANGE_UPSTREAM_LIST_TABLE', upstreamTable)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
