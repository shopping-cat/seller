import firebase from 'firebase/app'
import 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyABVvxeKD-JXG9IyLpA293epfRV0l2FK7g",
    authDomain: "shopping-cat-seller.firebaseapp.com",
    projectId: "shopping-cat-seller",
    storageBucket: "shopping-cat-seller.appspot.com",
    messagingSenderId: "28029479249",
    appId: "1:28029479249:web:16d945b09d0c335600cb70",
    measurementId: "G-B85NNEKHB6"
}

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

export const auth = app.auth()