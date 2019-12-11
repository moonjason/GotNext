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