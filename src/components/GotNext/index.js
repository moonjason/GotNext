import React from 'react';
import { Route, Switch } from 'react-router-dom'

import NavBar from '../NavBar';
import CourtShow from '../CourtShow';
import Main from '../Main';
import EditProfile from '../EditProfile';

const GotNext = ({ currentUser }) => {
    return (
        <div>
            <NavBar currentUser={currentUser}/>
            <Switch>
                <Route exact path={'/main'} render={() => <Main/>}/>
                <Route exact path={'/main/profile/edit'} render={() => <EditProfile currentUser={currentUser}/>}/>
                <Route exact path={'/main/:court'} render={routeProps => <CourtShow currentUser={currentUser} {...routeProps}/>}/>
            </Switch>
        </div>
    )
}

export default GotNext;