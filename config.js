import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBhMuEvzqeEfJrNWm4a6VBUy4anxPwChyU",
    authDomain: "random-password-generato-583c2.firebaseapp.com",
    projectId: "random-password-generato-583c2",
    storageBucket: "random-password-generato-583c2.appspot.com",
    messagingSenderId: "922087192991",
    appId: "1:922087192991:web:a63a408e406b83fb7765aa",
    measurementId: "G-1FH06SNXZV"
  };
  
  // Initialize Firebase

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;