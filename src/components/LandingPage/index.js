import React from 'react';
import { 
    Container,
    Title,
    InnerContainer,
    StyledLink,
    StyledBtn,
    Centering
 } from './style';

const LandingPage = () => {
    return (
        <Container>
            <InnerContainer>
                <Title>GotNEXT<img src="./images/gotnextpic.png" style={{'maxWidth': '4rem'}} alt=""/></Title>
                <StyledLink to="/main"><StyledBtn findParks={true}>Find Parks</StyledBtn></StyledLink>
                <StyledLink to="/login"><StyledBtn findParks={false}>Login</StyledBtn></StyledLink>
                <StyledLink to="/register"><StyledBtn findParks={false}><Centering>SignUp</Centering></StyledBtn></StyledLink>
            </InnerContainer>
        </Container>
    )
}

export default LandingPage; 