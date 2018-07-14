import {User} from '@/api/auth'

interface State {
  asideExpand: boolean,
  targetUrl: string| null,
  user: User| null,
  acl: Map<string, boolean>,
  token: string| null
}

const app = {
  namespaced: true,
  state: {
    asideExpand: false,
    targetUrl: null,
    user: null,
    acl: [],
    token: null
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
    setToken (state: State, token: string) {
      state.token = token
    }
  },

  getters: {
  }
}

export default app
