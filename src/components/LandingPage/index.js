import React from 'react';
import { 
    Container,
    Title,
    InnerContainer,
    StyledLink
 } from './style';

const LandingPage = () => {
    return (
        <Container>
            <InnerContainer>
                <Title>GotNEXT<img src="./images/gotnextpic.png" style={{'max-width': '4rem'}} alt=""/></Title>
                <StyledLink to="/main">Find Parks</StyledLink>
                <StyledLink to="/login">Login</StyledLink>
                <StyledLink to="/register">Register</StyledLink>
            </InnerContainer>
        </Container>
    )
}

export default LandingPage; 