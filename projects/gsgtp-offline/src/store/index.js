import Vue from 'vue'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vuex, { Store } from 'vuex'
const fb = require('../../firebaseconfig.js')
import {db} from '../../firebaseconfig'
import router from '../router'


Vue.use(Vuex)

var d = new Date();
let currentYear = d.getFullYear();

export default new Vuex.Store({
  state: {
    currentUser: {},
    userProfile: {},
    pulls: []
},
  mutations: {
    ...vuexfireMutations,
    setCurrentUser(state, val) {
        state.currentUser = val
    },
    setUserProfile(state, val) {
        state.userProfile = val
    },
    setUserRole(state, val) {
      state.userRole = val
  }
},
  actions: {
    // get and sync schedule
    bindSchedule: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('pulls', db.collection('pulls'))
    }),

    // add pull data to observer
    addPull: firestoreAction((context,payload) => {
      return db.collection('pull').add(payload)
    }),
  
    // sign in
    login({ dispatch}, form) {
      const {user} = fb.auth.signInWithEmailAndPassword(form.email, form.password)

    // fetch profile
    dispatch('fetchUserProfile', user)
    },

    // fetch pulls
    

    fetchUserProfile({commit}, user) {
      users = db.collection('users')
      const userProfile =  users.doc(user.uid).get()

      commit('setUserProfile', userProfile.data())

      router.push('/')
    },

    fetchUserProfile({ commit, state }) {
        fb.users.doc(state.currentUser.uid).get().then(res => {
            commit('setUserProfile', res.data())
            commit('setUserRole', res.data().role)
        }).catch(err => {
            console.log(err)
        })
    },
    
    clearData({ commit }) {
      commit('setCurrentUser', {})
      commit('setUserProfile', {})
      commit('setUserRole', null)
    }
},
  modules: {
  }
})

