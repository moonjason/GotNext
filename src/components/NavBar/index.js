import React from 'react';
import { 
    NavContainer,
    NavHeader,
    NavTitle,
    NavBtn,
    LinksContainer,
    Link
} from './style';
import { withFirebase } from '../Firebase';

const NavBar = ({ currentUser, firebase }) => {
    return (
        <NavContainer>
            <NavHeader>
                <NavTitle>
                    GotNext
                </NavTitle>
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
                            <Link exact to="/">{currentUser.displayName}</Link>
                            <Link exact to="/main" >Home</Link>
                            <Link exact to="/" >Check-Ins</Link>
                            <Link exact to="/main/profile/" >Profile</Link>
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