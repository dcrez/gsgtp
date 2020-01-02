import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

// Pages
//import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import UpdateStudent from './views/UpdateStudent.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
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