import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

export const MainTitle = styled.h1`
    text-align: center;
    margin-top: 25px;
    font-size: 3.5rem;
    font-family: 'Do Hyeon', sans-serif;
`

export const Instruction = styled.p`
    margin-top: 15px;
    text-align: center;
    font-size: 2rem;
    font-family: 'Do Hyeon', sans-serif;    
`

export const SearchBar = styled.input`
    padding: .75rem;
    width: 25rem;
    font-size: 1.5rem;
    border-radius: 1rem;    
    text-align: center;
    outline: none;
    &:focus {
        border: .2rem solid orange;
    }
`

export const StyledBtn = styled.button`
  cursor: pointer;
  display: inline-block;
  padding: .9em 1.9em;
  margin: 0 0.3em 0.3em 0;
  border-radius: .2em;
  filter: brightness(100%);
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  color: #FFFFFF;
  background-color: #FFBC14;
  text-align: center;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
  &:hover {
    filter: brightness(110%);
  }
`