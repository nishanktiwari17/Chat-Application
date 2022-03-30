// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBtXsqFNgsR9EpI-aHFwKvYp8FX45xYIJw",
  authDomain: "chat-application-5137c.firebaseapp.com",
  projectId: "chat-application-5137c",
  storageBucket: "chat-application-5137c.appspot.com",
  messagingSenderId: "535155431987",
  appId: "1:535155431987:web:e92fbc24efc4aa470aa146",
  measurementId: "G-JCGF5M7FYW"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;