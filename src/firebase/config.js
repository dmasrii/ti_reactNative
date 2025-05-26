import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAjF5pc_DrZWzmgpR5aW0EZAWQGIklhMXw",
    authDomain: "mi-primer-firebase-a7bc8.firebaseapp.com",
    projectId: "mi-primer-firebase-a7bc8",
    storageBucket: "mi-primer-firebase-a7bc8.firebasestorage.app",
    messagingSenderId: "444807630111",
    appId: "1:444807630111:web:14b4fa2d35ff11824f342a"
  };
  
app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()