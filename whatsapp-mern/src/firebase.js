// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAeO02h5DOadfKOhdvydSCdZdme-8s2iIA",
    authDomain: "whatsapp-clone-f6491.firebaseapp.com",
    projectId: "whatsapp-clone-f6491",
    storageBucket: "whatsapp-clone-f6491.appspot.com",
    messagingSenderId: "1081032854529",
    appId: "1:1081032854529:web:75df92db7555eabeb80400",
    measurementId: "G-3N4Y3J8BC7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;