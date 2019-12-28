import firebase from 'firebase'
import VueFirestore from 'vue-firestore'
import 'firebase/firestore'


// firebase init goes here
const config = {
    apiKey: "AIzaSyCm_aDsjQVeZXcQ0zJ-4N6nnDGG0YhXRtk",
    authDomain: "black-data-processing-analysts.firebaseapp.com",
    databaseURL: "https://black-data-processing-analysts.firebaseio.com",
    projectId: "black-data-processing-analysts",
    storageBucket: "black-data-processing-analysts.appspot.com",
    messagingSenderId: "629104127975",
    appId: "1:629104127975:web:adfe6c77e319c087a91742",
    measurementId: "G-DZ2GW7YJ0H"
  };

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser


// firebase collections
const usersCollection = db.collection('users')
const studentsCollection = db.collection('students')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    studentsCollection,
    commentsCollection,
    likesCollection
}