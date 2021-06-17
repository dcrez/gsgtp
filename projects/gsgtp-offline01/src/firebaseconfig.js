//import firebase from 'firebase'
//import 'firebase/firestore'

import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAW4Mil1SDOZ5r4CwtZbfsuYqpenEZo7VU",
    authDomain: "gsgtp-club.firebaseapp.com",
    databaseURL: "https://gsgtp-club.firebaseio.com",
    projectId: "gsgtp-club",
    storageBucket: "gsgtp-club.appspot.com",
    messagingSenderId: "126015397267",
    appId: "1:126015397267:web:a48b6b5ab1b36cad4a1c66",
    measurementId: "G-TZVS0JE3LL"
  };

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()

db.enablePersistence()
.catch (function(err) {
    if (err.code == 'failed-precondition') {
        // multiple tabs open
        console.log('Precondition: '+ err)
    }
    else if (err.code == 'unimplemented') {
        console.log('Browser does not support persistence')
    }
});

const currentUser = auth.currentUser

const users = db.collection('users')
//const scheduledEvents = db.collection('schedule')
const vehicles = db.collection('vehicles')
const classes = db.collection('classes')
const members = db.collection('members')
const pulls = db.collection('pulls')

export {
    db,
    auth,
    currentUser,
    users,
    //scheduledEvents,
    vehicles,
    classes,
    members,
    pulls
}