// Vue function
import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import App from './App.vue'
import NProgress from 'nprogress'
//import jquery from 'jquery/dist/jquery.slim'
//import Popper from 'popper.js'
//import moment from 'moment'


// Components
import addPull from './components/addPull.vue'
import editPull from './components/editPull.vue'
import listPulls from './components/listPulls.vue'
import home from './components/home.vue'
import scheduleEvent from './components/scheduleEvent.vue'
import listEvents from './components/listEvents.vue'
import editEvent from './components/editEvent.vue'

import '../node_modules/nprogress/nprogress.css'
//import '../node_modules/moment/moment.js'


Vue.use(VueFire)
Vue.use(VueRouter)
//Vue.use(Popper)
Vue.config.productionTip = false

const routes = [
  {
    name:'home',
    path:'/',
    component:home
  },
  {
    name: 'addPull',
    path: '/pulls/add',
    component:addPull
  },
  {
    name:'editPull',
    path:'/pulls/edit/:id',
    component:editPull
  },
  {
    name:'listPulls',
    path:'/pulls',
    component:listPulls
  },
  {
    name:'scheduleEvent',
    path:'/schedule/add',
    component: scheduleEvent
  },
  {
    name:'editEvent',
    path: '/schedule/edit/:id',
    component: editEvent
  },
  {
    name: 'listEvents',
    path:'/schedule',
    component: listEvents
  }
]

const router = new VueRouter({mode:'history', routes: routes})

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
