import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../LandingPage';
import Login from '../Login';
import Register from '../Register';

const Intro = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} component={LandingPage}/>
                <Route exact path={'/login'} render={routeProps => <Login {...routeProps}/>}/>
                <Route exact path={'/register'} render={routeProps => <Register {...routeProps}/>}/>
            </Switch>
        </div>
    )
}

export default Intro