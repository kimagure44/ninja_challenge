import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { apiService } from './services/index.js'

Vue.config.productionTip = false
Vue.prototype.$apiService = apiService

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
