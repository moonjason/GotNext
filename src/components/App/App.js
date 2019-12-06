import React, { useState } from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Switch, 
} from 'react-router-dom';

import CourtShow from '../CourtShow'
import Main from '../Main';
import SignUp from '../Signup'
import '../../App.css';


const App = () => {
  const [currentUser, setCurrentUser] = useState();
  

  return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path={'/'} render={() => <h1>Landing Page</h1>}/>
            <Route exact path={'/signin'} render={() => <h1>sign in page</h1>}/>
            <Route exact path={'/signup'} render={() => <SignUp />}/>
            <Route exact path={'/'} render={() => <h1>Landing Page</h1>}/>
            <Route exact path={'/main'} component={Main}/>
            <Route exact path={'/main/:court'} component={CourtShow}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
