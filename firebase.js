import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCy9wpehZcFScsjf5hQuTp5l5Nf2nOG-Ig",
  authDomain: "xpress-9e7b4.firebaseapp.com",
  projectId: "xpress-9e7b4",
  storageBucket: "xpress-9e7b4.appspot.com",
  messagingSenderId: "119103869780",
  appId: "1:119103869780:web:a0060ecbc9ff79bb916ec1",
};

const app = !firebase.app.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new fireebase.auth.GoogleAuthProvider();

export { db, auth, provider };
