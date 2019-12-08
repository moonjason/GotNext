import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Switch, 
} from 'react-router-dom';
import { withFirebase } from '../Firebase';

import CourtShow from '../CourtShow';
import Main from '../Main';
import Login from '../Login';
import Register from '../Register';

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
            <Route exact path={'/'} render={() => <h1>Landing Page</h1>}/>
            <Route exact path={'/login'} render={routeProps => <Login {...routeProps}/>}/>
            <Route exact path={'/register'} render={routeProps => <Register {...routeProps}/>}/>
            <Route exact path={'/main'} render={() => <Main currentUser={currentUser}/>}/>
            <Route exact path={'/main/:court'} component={CourtShow}/>
          </Switch>
      </Router>
    </div>
  );
}

export default withFirebase(App);
