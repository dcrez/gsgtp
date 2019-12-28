import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
      store.commit('setCurrentUser', user)
      store.dispatch('fetchUserProfile')

      fb.usersCollection.doc(user.uid).onSnapshot(doc => {
          store.commit('setUserProfile', doc.data())
      })

      // realtime updates from our posts collection
      fb.studentsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
          // check if created by currentUser
          let createdByCurrentUser
          if (querySnapshot.docs.length) {
              createdByCurrentUser = store.state.currentUser.uid == querySnapshot.docChanges[0].doc.data().userId ? true : false
          }

          // add new posts to hiddenPosts array after initial load
          if (querySnapshot.docChanges.length !== querySnapshot.docs.length
              && querySnapshot.docChanges[0].type == 'added' && !createdByCurrentUser) {

              let student = querySnapshot.docChanges[0].doc.data()
              student.id = querySnapshot.docChanges[0].doc.id

              store.commit('setHiddenPosts', student)
          } else {
              let studentsArray = []

              querySnapshot.forEach(doc => {
                  let student = doc.data()
                  student.id = doc.id
                  studentsArray.push(post)
              })

              store.commit('setStudents', studentsArray)
          }
      })
  }
})


export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    students: []
  },
  mutations: {
    setCurrentUser(state, val) {
        state.currentUser = val
    },
    setUserProfile(state, val) {
        state.userProfile = val
    },
    setStudents(state,val) {
      state.posts = val
    }
  },
  actions: {
    clearData({ commit }) {
        commit('setCurrentUser', null)
        commit('setUserProfile', {})
        commit('setStudents', null)
        //commit('setHiddenPosts', null)
    },
    fetchUserProfile({ commit, state }) {
        fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
            commit('setUserProfile', res.data())
        }).catch(err => {
            console.log(err)
        })
    },
    updateProfile({ commit, state }, data) {
        let name = data.name

        fb.usersCollection.doc(state.currentUser.uid).update({ name }).then(user => {
            // update all posts by user to reflect new name
            fb.studentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                docs.forEach(doc => {
                    fb.studentsCollection.doc(doc.id).update({
                        name: name
                    })
                })
            })
            // update all comments by user to reflect new name
            fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                docs.forEach(doc => {
                    fb.commentsCollection.doc(doc.id).update({
                        userName: name
                    })
                })
            })
        }).catch(err => {
            console.log(err)
        })
    }
},
  getters: {

  }
})