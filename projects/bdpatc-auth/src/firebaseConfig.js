// Firebase 
import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
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
  
  firebase.initializeApp(config);
  
// utilities
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

  // frequent collections
const usersCollection = db.collection('users')
const studentsCollection = db.collection('students')
const formsCollection = db.collection('forms')
const classesCollection = db.collection('classes')
const attendanceCollection = db.collection('attendance')

export {
  db, 
  auth, 
  currentUser, 
  usersCollection, 
  studentsCollection, 
  formsCollection, 
  classesCollection, 
  attendanceCollection
}

