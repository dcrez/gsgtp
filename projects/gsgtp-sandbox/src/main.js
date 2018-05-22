import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import App from './App.vue'

import addPull from './components/addPull.vue'
import editPull from './components/editPull.vue'
import listPulls from './components/listPulls.vue'
import home from './components/home.vue'

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {
    name:'home',
    path:'/',
    component:'home'
  },
  {
    name: 'addPull',
    path: '/pulls/add',
    component:'addPull'
  },
  {
    name:'editPull',
    path:'/pulls/edit/:id',
    component:'editPull'
  },
  {
    name:'listPulls',
    path:'/pulls',
    component:'listPulls'
  }
]

const router = new VueRouter({mode:'history', routes: routes})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
