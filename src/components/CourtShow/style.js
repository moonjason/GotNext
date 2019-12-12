import styled from 'styled-components';

export const Pin = styled.img`
    width: 40px;
    height: 40px;
`

export const CourtContainer = styled.div`
    display: flex;
    padding: 1.5rem;
    justify-content: center;
`
export const MapBorder = styled.div`
  border: .5rem outset #FF9B40;
  border-radius: .9rem;
`

export const CourtTitle = styled.h1`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 4rem;
  text-align: center;
  margin-top: 2rem;
`

export const CourtInfo = styled.div`
  padding-left: -30rem;
`

export const ModalWindow = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.50);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    visibility: ${props => props.showModal ? "visible" : "hidden"};
    opacity: ${props => props.showModal ? "1" : "0"};
    pointer-events: ${props => props.showModal ? "auto" : "none"};
    transition: all 0.3s;
    &>div {
      width: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 2em;
      background: #ffffff;
    }
    header {
      font-weight: bold;
    }
    h1 {
      font-size: 150%;
      margin: 0 0 15px;
    }
`

export const ModalClose = styled.a`
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  cursor: pointer;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
`

export const Container1 = styled.div`
  min-height: 25rem;
  width: 69rem;
  display: flex;
  margin-left: 8rem;
`

export const Container2 = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container3 = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const SportTitle = styled.div`
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

export const MessageHeading = styled.h3`
  height: 5%;
  text-align: center;
`

export const MessageList = styled.div`
  height: 95%;
`

export const CenterContainer = styled.div`
  /* width: 100vh;
  text-align: center;
  margin-left: 25px;   */
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
  width: 27%;
`
export const CardMessagesTitle= styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  color: black;
  box-shadow:0px 2px 2px black;
  width: 34%;
`
export const CardAddressTitle= styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  color: black;
  box-shadow:0px 2px 2px black;
  width: 41%;
`

export const CardContactTitle= styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  color: black;
  box-shadow:0px 2px 2px black;
  width: 39.5%;
`

export const CardCategoriesTitle= styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  color: black;
  box-shadow:0px 2px 2px black;
  width: 54%;
`

