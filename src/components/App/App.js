import React, { useState } from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Switch, 
} from 'react-router-dom';

import CourtShow from '../CourtShow';
import Main from '../Main';
import Login from '../Login';
import Register from '../Register';
import '../../App.css';


const App = () => {
  const [currentUser, setCurrentUser] = useState();
  
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path={'/'} render={() => <h1>Landing Page</h1>}/>
            <Route exact path={'/login'} render={() => <Login />}/>
            <Route exact path={'/register'} render={routeProps => <Register {...routeProps}/>}/>
            <Route exact path={'/main'} component={Main}/>
            <Route exact path={'/main/:court'} component={CourtShow}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
