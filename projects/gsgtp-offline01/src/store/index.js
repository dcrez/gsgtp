import Vue from 'vue'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vuex from 'vuex'
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
    bindPulls: firestoreAction(({bindFirestoreRef}) => {
      var filteredPulls = fb.collection('pulls').orderBy("date", "desc").where('year', '==', currentYear)
      console.log(filteredPulls)
      return bindFirestoreRef('pulls', filteredPulls )
    }),
    // sign in
    login({ dispatch}, form) {
      const {user} = fb.auth.signInWithEmailAndPassword(form.email, form.password)

    // fetch profile
    dispatch('fetchUserProfile', user)
    },

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
