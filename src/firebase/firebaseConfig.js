import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/storage'

// Initialize Firebase
let config = {
    apiKey: "AIzaSyDdcLv-nPvdySavL1rIx4HC07Di-U0aNPs",
    authDomain: "iflow-6ca05.firebaseapp.com",
    projectId: "iflow-6ca05",
    storageBucket: "iflow-6ca05.appspot.com",
    messagingSenderId: "488179758548",
    appId: "1:488179758548:web:fdf511bab7c272dfc79241",
    measurementId: "G-J841PGL8T4"
}

firebase.initializeApp(config)
firebase.analytics()

// utils
const db = firebase.firestore()
const storage = firebase.storage()
const FieldValue = firebase.firestore.FieldValue
const Timestamp = firebase.firestore.Timestamp
const auth = firebase.auth()

export {
    db,
    auth,
    FieldValue,
    Timestamp,
    storage
}
