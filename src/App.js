import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CourtShow from './components/CourtShow'
import Main from './components/Main';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} render={() => <h1>Landing Page</h1>}/>
        <Route exact path={'/main'} component={Main}/>
        <Route exact path={'/main/:court'} component={CourtShow}/>
      </Switch>
    </div>
  );
}

export default App;
