import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/storage'

// Initialize Firebase
let config = {
    apiKey: "AIzaSyCObcwMCGinznxt1d_puaoDsgDSoG9qpCE",
    authDomain: "livesport-94128.firebaseapp.com",
    projectId: "livesport-94128",
    storageBucket: "livesport-94128.appspot.com",
    messagingSenderId: "247693735027",
    appId: "1:247693735027:web:393383c0c3b0517140a606",
    measurementId: "G-4546P8T8PY"
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
