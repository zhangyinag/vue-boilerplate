import {User} from '@/api/auth'

interface State {
  asideExpand: boolean,
  targetUrl: string| null,
  user: User| null,
  acl: Map<string, boolean>
}

const app = {
  namespaced: true,
  state: {
    asideExpand: false,
    targetUrl: null,
    user: null,
    acl: []
  },
  mutations: {
    setAsideExpand (state: State, payload: boolean) {
      state.asideExpand = payload
    },
    setTargetUrl (state: State, url: string| null) {
      state.targetUrl = url
    },
    setUser (state: State, user: User| null) {
      state.user = user
    },
    setAcl (state: State, acl: Map<string, boolean>) {
      state.acl = acl
    },
  },

  getters: {
  }
}

export default app
