import app from './modules/app/index'
import {namespace} from 'vuex-class'
import {BindingHelpers} from 'vuex-class/lib/bindings'

export default {app, dict: {}}

export const AppModule: BindingHelpers = namespace('app')
