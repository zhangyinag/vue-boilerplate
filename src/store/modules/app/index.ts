interface State {
  asideExpand: boolean
}

const app = {
  namespaced: true,
  state: {
    asideExpand: false
  },
  mutations: {
    setAsideExpand (state: State, payload: boolean) {
      state.asideExpand = payload
    }
  },

  getters: {
  }
}

export default app