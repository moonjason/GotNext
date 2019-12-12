import styled, { keyframes } from 'styled-components';

export const Container1 = styled.div`
  min-height: 25rem;
  width: 69rem;
  display: flex;
  margin-left: 8rem;
`

export const Container2 = styled.div`
  width: 40%;
  display: flex;
`

export const Container3 = styled.div`
  width: 60%;
  display: flex;
`

export const SportDiv = styled.div`
  background: rgb(217,208,38);
  background: linear-gradient(90deg, rgba(217,208,38,1) 0%, rgba(233,189,33,1) 34%, rgba(255,163,26,1) 75%, rgba(255,134,0,1) 100%, rgba(252,184,69,1) 100%);
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 90%;
  border: 8px outset #FF541C;
  border-radius: .9rem;
  padding: .4rem;
`

export const CourtDiv = styled.div`
  display: flex;
`

export const Players = styled.div`
  width: 50%;
`

export const PlayerHeading = styled.h3`
  height: 5%;
  text-align: center;
`

export const PlayerList = styled.div`
  height: 95%;
`
 
export const Messages = styled.div`
  width: 50%;
`
export const SportTitle = styled.div`
`

export const MessageHeading = styled.h3`
  height: 5%;
  text-align: center;
`

export const MessageList = styled.div`
  height: 95%;
`

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledBtn = styled.button`
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
  background-color: ${props => props.checkIn ? '#3369ff' : '#E86262'};
  text-align: center;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
  &:hover {
    filter: brightness(150%);
  }
`
export const CardTitle = styled.h1`
  font-family: 'Do Hyeon', sans-serif;
  color: black;
  box-shadow:0px 4px 4px black;
`
export const CardPlayersTitle= styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  color: black;
  box-shadow:0px 2px 2px black;
  width: 18%;
`
export const CardMessagesTitle= styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  color: black;
  box-shadow:0px 2px 2px black;
  width: 22%;
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
    color: #00FF59;
  }
  50%{
    opacity: .6;
    color: #00FF59;
  }
  100% {
    opacity: 1;
    color: black;
  }
`

export const PlayerP = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  animation: ${fadeIn} 1.2s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
`

export const DetailP = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  animation: ${fadeIn} 1.2s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
`
export const CourtDetailP = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1rem;
`