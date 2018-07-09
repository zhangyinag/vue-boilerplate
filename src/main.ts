import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import SvgIcon from './plugins/svg/index'
import ECharts from 'vue-echarts/components/ECharts.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(SvgIcon)
Vue.component('chart', ECharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
