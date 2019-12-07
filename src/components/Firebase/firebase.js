import app from 'firebase/app';
import 'firebase/firebase-firestore'
import 'firebase/storage'
import "firebase/auth"

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

console.log(config)

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.db = app.firestore()
    this.auth = app.auth()
    this.storage = app.storage()
  }

  doCreateUser = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  findUser = uid => this.db.doc(`users/${uid}`);
}

export default Firebase;