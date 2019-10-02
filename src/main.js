import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/css/base.css'
import '@/assets/css/phone.css'
import '@/assets/css/printer.css'
import '@/assets/css/reset.css'
import '@/assets/css/small.css'
import '@/assets/css/tablet.css'
import '@/assets/css/unal.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal'
import VueSession from 'vue-session'
const options = {
  confirmButtonColor: '#003e1e'
}

Vue.use(VueSession)
Vue.use(VueSweetalert2, options)
Vue.use(VModal, { dialog: true })
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.component('multiselect', Multiselect)
library.add(fab, fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
