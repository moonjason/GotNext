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
      <Router>
        <div className="App">
          <Switch>
            <Route exact path={'/'} render={() => <h1>Landing Page</h1>}/>
            <Route exact path={'/login'} render={() => <Login />}/>
            <Route exact path={'/register'} render={() => <Register />}/>
            <Route exact path={'/main'} component={Main}/>
            <Route exact path={'/main/:court'} component={CourtShow}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
