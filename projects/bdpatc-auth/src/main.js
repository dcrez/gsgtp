import Vue from 'vue'

import App from './App.vue'
import router from './router'
import {store} from './store.js'
const fb = require('./firebaseConfig.js')
// import './registerServiceWorker'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import { currentUser } from './firebaseConfig'

Vue.use(BootstrapVue)

//Vue.config.productionTip = false

// Reload catcher
let app 
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    }) //.$mount('#app');
  }
});


