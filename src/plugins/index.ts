import Vue from 'vue'
import ElementUI from 'element-ui'
import SvgIconInstaller from './svg/index'
import ECharts from 'vue-echarts/components/ECharts.vue'
import authInstaller from '@/plugins/auth'
import httpInstaller from '@/plugins/http'

export default function install (): void {
  Vue.use(ElementUI)
  Vue.use(SvgIconInstaller)
  Vue.use(authInstaller)
  Vue.use(httpInstaller)
  Vue.component('chart', ECharts)
}

export {auth} from './auth/index'
export {http} from './http/index'
