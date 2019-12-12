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
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          firebase.db.collection('users').doc(authUser.uid).get()
            .then(doc => {
                setCurrentUser({...doc.data()})
            }).catch(err => {
              console.log(err)
            })
          firebase.db.collection('users').doc(authUser.uid).onSnapshot(snapshot => setCurrentUser({...snapshot.data()}))
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
            <Route path={"/"} render={routeProps => <Intro {...routeProps}/>}/>
          </Switch>
      </Router>
    </div>
  );
}

export default withFirebase(App);
