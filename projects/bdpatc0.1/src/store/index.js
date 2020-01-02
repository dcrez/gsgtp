import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig.js')
import {
  studentsCollection, auth
} from '../firebaseConfig.js'

Vue.use(Vuex)

let loggedInUser
// get current user
auth.onAuthStateChanged(function (user) {
  if (user) {
    loggedInUser = user.uid;
    studentsCollection
      .where("userId", "==", loggedInUser)
      .onSnapshot((studentsRef) => {
        const students = [];
        studentsRef.forEach((doc) => {
          const student = doc.data();
          student.id = doc.id;
          students.push(student);
        })
        store.commit('setStudents', students)
      })
  } else {
    console.log('No one is signed in!')
  }
})

// handle page reload
/*auth.setPersistence(auth.Persistence.SESSION)
  .then(function () {
    // Auth states are persisted in current session.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  })*/



export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    students: [],
    hiddenStudents: []
  },
  actions: {
    clearData({
      commit
    }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      commit('setStudents', null)
      commit('setHiddenStudents', null)
    },
    fetchUserProfile({
      commit,
      state
    }) {
      fb.usersCollection.doc(store.state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    }
    /*,
    updateProfile({ commit, state }, data) {
        let name = data.name
        let phone = data.phone
        let parent = data.parent

        fb.usersCollection.doc(state.currentUser.uid).update({ name, title }).then(user => {
            // update all posts by user to reflect new name
            fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                docs.forEach(doc => {
                    fb.postsCollection.doc(doc.id).update({
                        userName: name
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
    } */
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setStudents(state, val) {
      if (val) {
        state.students = val
      } else {
        state.students = []
      }
    },
    setHiddenStudents(state, val) {
      if (val) {
        // make sure not to add duplicates
        if (!state.hiddenStudents.some(x => x.id === val.id)) {
          state.hiddenStudents.unshift(val)
        }
      } else {
        state.hiddenStudents = []
      }
    }
  }
})