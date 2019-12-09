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

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.db = app.firestore()
    this.auth = app.auth()
    this.storage = app.storage()
  }
  
  doAddFile = file => {
    return this.storage.ref()
        .child(file.name)
        .put(file)
  }

  doCreateUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  
  doSignIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  findUser = uid => this.db.doc(`users/${uid}`);
}

export default Firebase;