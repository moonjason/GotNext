import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    margin-top: 12rem;
    width: 37%;
    height: 42%;
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

export const StyledLink = styled(Link)`
    display: block;
    text-align: center;
    position: relative;
`

export const StyledBtn = styled.button`
  max-width: 5rem;
  cursor: pointer;
  display: inline-block;
  padding: 1.2em 2.2em;
  margin: 0 0.3em 0.3em 0;
  border-radius: .2em;
  filter: brightness(100%);
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  color: #FFFFFF;
  background-color: ${props => props.findParks ? '#FF9B00' : '#00BAB1'};
  text-align: center;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
  &:hover {
    filter: brightness(120%);
  }
`
export const Centering = styled.div`
    position: relative;
    right: 5px;
`