import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

export const CourtLinkCard = styled.div`
    width: 30rem;
    max-width: 60rem;
    border-radius: 1rem;
    border: .2rem solid;
    border-image: linear-gradient(45deg, #FF4600, rgb(250,224,66)) 1;
    text-align: center;
    padding: 1rem 0;
    animation: ${fadeIn} .5s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
    background-color: rgba(255, 224, 98, .3);
`

export const CourtCard = styled.div`
    padding: 5px;
`