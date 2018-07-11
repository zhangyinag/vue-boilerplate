import Vue from 'vue'
import ElementUI from 'element-ui'
import SvgIcon from './svg/index'
import ECharts from 'vue-echarts/components/ECharts.vue'
import Acl from '@/plugins/auth'

export default function install (): void {
  Vue.use(ElementUI)
  Vue.use(SvgIcon)
  Vue.use(Acl)
  Vue.component('chart', ECharts)
}

export {auth} from './auth/index'

