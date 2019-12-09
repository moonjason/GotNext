import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Switch, 
} from 'react-router-dom';
import { withFirebase } from '../Firebase';

import GotNext from '../GotNext';
import Intro from '../Intro';

import '../../App.css';

const App = ({ firebase }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const findAuth = () => {
      firebase.auth.onAuthStateChanged(async authUser => {
        console.log(authUser)
        if (authUser) {
          const getDisplayName = await firebase.db.collection('users').doc(authUser.uid).get()
            .then(doc => {
              if (doc.exists){
                return doc.data().displayName
              }
            }).catch(err => {
              console.log(err)
            })
          console.log(getDisplayName)
          setCurrentUser({
            email: authUser.email,
            userId: authUser.uid,
            displayName: getDisplayName
          })
        } else{
          setCurrentUser(null)
        } 
      })
    };
    findAuth();
  }, [])
  
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path={'/main'} render={() => <GotNext currentUser={currentUser}/>}/>
            <Route path={"/"} component={Intro}/>
          </Switch>
      </Router>
    </div>
  );
}

export default withFirebase(App);
