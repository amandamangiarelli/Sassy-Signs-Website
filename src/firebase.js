import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyDQA9L3Fm6c-Q7S0zsyHPa3mP_21ikeSgU",
  authDomain: "sassysigns-5ab96.firebaseapp.com",
  projectId: "sassysigns-5ab96",
  storageBucket: "sassysigns-5ab96.appspot.com",
  messagingSenderId: "386123511931",
  appId: "1:386123511931:web:ea2ae55553f674c6908ade"
})

export const auth = app.auth()
export default app