import React from 'react';
import { 
    NavContainer,
    NavHeader,
    NavTitle,
    NavBtn,
    LinksContainer,
    Link,
    CurrentUser,
} from './style';
import { withFirebase } from '../Firebase';
import { NavLink } from 'react-router-dom';

const NavBar = ({ currentUser, firebase }) => {
    return (
        <NavContainer>
            <NavHeader>
                <NavLink to="/main">
                    <NavTitle>
                        GotNEXT
                    </NavTitle>
                </NavLink>
            </NavHeader>
            <NavBtn>
                <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </NavBtn>
            {
                currentUser
                    ?
                        <LinksContainer>
                            <CurrentUser>{currentUser.displayName}</CurrentUser>
                            <Link exact to="/main" >Home</Link>
                            <Link exact to="/main/mycheckin" >MyCheckIn</Link>
                            <Link exact to={`/main/profile/${currentUser.userId}`} >Profile</Link>
                            <Link exact to="/" onClick={() => firebase.doSignOut()} >Sign Out</Link>
                        </LinksContainer>
                    : 
                        <LinksContainer>
                            <Link to="/login" >Login</Link>
                            <Link to="/register" >Register</Link>
                        </LinksContainer>
            }
        </NavContainer>
    )
}

export default withFirebase(NavBar); 