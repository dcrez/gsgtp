import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import home from '../views/Home.vue'
import login from '../views/login.vue'
import schedule from '../components/schedule.vue'
import schedulePull from '../views/schedulePull.vue'
import standings from '../views/standings.vue'
import cities from '../views/host.vue'
import cityDetail from '../views/cityDetail.vue'
import admin from '../views/admin.vue'
import pullDetails from '../views/pullDetails.vue'
import members from '../views/members.vue'
import printSchedule from '../views/printSchedule.vue'
import rules from '../views/rules.vue'
import previousYearPoints from '../views/previousYearPoints.vue'
import addMember from '../views/addMember.vue'
import classes from '../views/classes.vue'
import vehicleDetails from '../views/vehicleDetails.vue'
import memberDetails from '../views/memberDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: schedule
  },
  {
    path: '/print/schedule',
    name: 'printSchedule',
    component: printSchedule
  },
  {
    path: '/members',
    name: 'members',
    component: members,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/classes',
    name: 'classes',
    component: classes
  },
  {
    path: '/member/add',
    name: 'addMember',
    component: addMember
  },
  {
    path: '/member/:id',
    name: 'memberDetails',
    component: memberDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pull/:date/:id',
    name: 'pullDetails',
    component: pullDetails
  },
  {
    path: '/addEvent',
    name: 'schedulePull',
    component: schedulePull,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/standings',
    name: 'standings',
    component: standings
  },
  {
    path: '/standings/:year',
    name: 'previousYearPoints',
    component: previousYearPoints
  },
  {
    path: '/host',
    name: 'cities',
    component: cities
  },
  {
    path: '/host/:id',
    name: 'cityDetail',
    component: cityDetail
  },
  {
    path: '/vehicle/:id',
    name: 'vehicleDetails',
    component: vehicleDetails
  },
  {
    path: '/rules',
    name: 'rules',
    component: rules
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  //mode: 'history',
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
