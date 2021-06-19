import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import lodash from 'lodash/map'


import VueAnalytics from 'vue-analytics'
import moment from 'moment-timezone'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faTractor } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faHighlighter } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faRoad } from '@fortawesome/free-solid-svg-icons'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faPrint } from '@fortawesome/free-solid-svg-icons'


moment.tz.setDefault('America/Chicago')









import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLock, faPrint, faLockOpen, faCalendarAlt, faUser, faHome, faCircle, faTractor, faLink, faDollarSign, faTrashAlt, faHighlighter, faPencilAlt, faTrophy, faRoad, faSeedling, faTimesCircle, faPlus, faCalendar)


Vue.use(firebase)
Vue.use(firestorePlugin)
Vue.use(VueTheMask)
Vue.use(require('vue-moment'))
Vue.use(Vuelidate)
Vue.use(lodash)
Vue.use(library)

Vue.component('font-awesome-icon', FontAwesomeIcon)



const fb = require('../firebaseconfig.js')

//const { required, maxLength, email } = validators
//const validationMixin = vuelidate.validationMixin


Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-142572440-1',
  router
})


let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue ({
      router,
      store,
      vuetify,
      //mixins: [validationMixin],
      render: h => h(App)
    }).$mount('#app')
  }
})


/*
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
*/