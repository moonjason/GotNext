import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('./images/rooftopcourt.jpg');
    background-position: center;
    background-size: cover;
`

export const InnerContainer = styled.div`
    margin-top: 10rem;
    width: 40%;
    height: 41%;
    background: rgba(255, 255, 255, .8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Title = styled.h1`
    font-size: 7rem;
    font-family: 'Do Hyeon', sans-serif;
    display: block;
`