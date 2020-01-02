import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import Login from '../views/login.vue'
import Dashboard from '../views/dashboard.vue'
import UpdateStudent from '../views/updateStudent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
      {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
          meta: {
              requiresAuth: true
          }
  },
  {
    path: '/update',
    name: 'UpdateStudent',
    component: UpdateStudent,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})


export default router
