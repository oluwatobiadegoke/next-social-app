import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.firebase_api_key,
  authDomain: process.env.firebase_auth_domain,
  projectId: process.env.firebase_project_id,
  storageBucket: process.env.firebase_storage_bucket,
  messagingSenderId: process.env.firebase_messaging_senderId,
  appId: process.env.firebase_app_id,
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
