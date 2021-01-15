import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { apiService } from './services/index.js'
import Lodash from 'lodash'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.prototype.$apiService = apiService
Vue.prototype.$lodash = Lodash

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
