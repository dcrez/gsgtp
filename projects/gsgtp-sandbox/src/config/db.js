// Load Firebase to project
import Firebase from 'firebase'

// Define which DB to look at
let config = {
    apiKey: "AIzaSyCK3lJyrQ5qzYcqQorRlPkcoCGh38wdMW8",
    authDomain: "gsgtp-b4448.firebaseapp.com",
    databaseURL: "https://gsgtp-b4448.firebaseio.com",
    projectId: "gsgtp-b4448",
    storageBucket: "gsgtp-b4448.appspot.com",
    messagingSenderId: "553297979168"
    };

// Initialize Firebase in App
let app = Firebase.initializeApp(config)
export const db = app.database()