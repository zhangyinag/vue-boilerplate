import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app/index'
import {namespace} from 'vuex-class'
import {BindingHelpers} from 'vuex-class/lib/bindings'

export const AppModule: BindingHelpers = namespace('app')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app
  }
})
