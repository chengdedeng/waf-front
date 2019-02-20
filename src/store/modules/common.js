const state = {
  contentPageName: '',
  upstreamTable: [],
  modalCurrentView: '',
  rowNum: ''
}

const mutations = {
  CHANGE_PAGE_NAME (state, name) {
    state.contentPageName = name
  },
  CHANGE_UPSTREAM_LIST_TABLE (state, upstreamTable) {
    state.upstreamTable = upstreamTable
  },
  CHANGE_MODAL_VIEW (state, view) {
    state.modalCurrentView = view
  },
  CHANGE_ROW_NUM (state, num) {
    state.rowNum = num
  }
}

const actions = {
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
