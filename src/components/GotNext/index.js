import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from '../NavBar';
import CourtShow from '../CourtShow';
import Main from '../Main';
import ProfileShow from '../ProfileShow';
import EditProfile from '../EditProfile';

const GotNext = ({ currentUser }) => {
    return (
        <div>
            <NavBar currentUser={currentUser}/>
            <Switch>
                <Route exact path={'/main'} render={() => <Main/>}/>
                <Route exact path={'/main/profile'} render={routeProps => <ProfileShow currentUser={currentUser} {...routeProps}/>}/>
                <Route exact path={'/main/mycheckin'} render={() => <div>myCheckIn Page</div>}/>
                <Route exact path={'/main/profile/edit'} render={routeProps => <EditProfile currentUser={currentUser} {...routeProps}/>}/>
                <Route exact path={'/main/:court'} render={routeProps => <CourtShow currentUser={currentUser} {...routeProps}/>}/>
            </Switch>
        </div>
    )
}

export default GotNext;