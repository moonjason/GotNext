import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import {
    CenterContainer,
    Container1,
    SportDiv,
    SportTitle,
    CardTitle,
    CourtDiv,
    Players,
    CardPlayersTitle,
    PlayerP,
    Messages,
    CardMessagesTitle,
    DetailP,
    StyledBtn
} from './style';

import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";

const MyCheckIn = ({ currentUser, firebase }) => {
    const [checkedInPlayers, setCheckedInPlayers] = useState(null)
    const [courtName, setCourtName] = useState(null)
    const [isCheckedIn, setIsCheckedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    const override = css`
        display: block;
        margin: 2rem auto;
    `; 

    useEffect(() => {
        if (currentUser !== null) {
            if (currentUser.currentCheckIn !== '') {
                firebase.db.collection('courts').doc(currentUser.currentCheckIn).get()
                .then(doc => {
                    if (doc.exists) {
                        setCheckedInPlayers([...doc.data().Basketball])
                        setCourtName(doc.data().courtName)
                    }
                }).catch(err => console.log(err))
                firebase.db.collection('courts').doc(currentUser.currentCheckIn).onSnapshot(snapshot => setCheckedInPlayers([...snapshot.data().Basketball]))
            } else {
                setIsCheckedIn('')
            }
        }
        setInterval(() =>{
            setLoading(false);
        }, 900)
    }, [currentUser])

    const removePlayerFromCourt = () => {
        const removedPlayer = checkedInPlayers.filter(player => player.playerId !== currentUser.userId )
        firebase.db.collection('courts').doc(currentUser.currentCheckIn).update({
            Basketball: removedPlayer
        }).then(() => {
            firebase.db.collection('users').doc(currentUser.userId).update({
                isCheckedIn: false,
                currentCheckIn: ''
            })
        })
        .catch(err => console.log(err))
    } 

    
    const renderContent = () => {
        if(currentUser.currentCheckIn !== ''){
            return (
                <CenterContainer>
                <h1 style={{'fontFamily': "'Do Hyeon', sans-serif", 'marginTop': '1rem', 'fontSize': '3rem'}}>Current CheckIn:</h1>
                <h1 style={{'fontFamily': "'Do Hyeon', sans-serif", 'fontSize': '2.5rem'}}>{courtName}</h1>
                <StyledBtn checkIn={false} onClick={() => removePlayerFromCourt()}>Leave</StyledBtn>
                <Container1>
                        <SportDiv>
                                    <SportTitle>
                                        <CardTitle>Basketball Players:{' '}{checkedInPlayers.length}</CardTitle>
                                    </SportTitle>
                                    <CourtDiv>
                                        <Players>
                                            <br/>
                                            <CardPlayersTitle><u>Players</u></CardPlayersTitle>
                                            {
                                                checkedInPlayers.map((player, i) => 
                                                    <Link to={`/main/profile/${player.playerId}`} key={i}><PlayerP>{player.playerName}</PlayerP></Link>
                                                )
                                            }
                                        </Players>
                                        <Messages>
                                            <br/>
                                            <CardMessagesTitle><u>Messages</u></CardMessagesTitle>
                                            {
                                                checkedInPlayers.map((player, i) => 
                                                    <DetailP key={i}>{player.message}</DetailP>
                                                )
                                            }
                                        </Messages>
                                    </CourtDiv>
                            </SportDiv>
                </Container1>
            </CenterContainer>
            )
        } else {
            return(
                <div style={{'textAlign': 'center', 'marginTop': '2rem', 'fontFamily': "'Do Hyeon', sans-serif"}}>
                    <h1>You are currently not checked in anywhere!</h1>
                    <h3>Click <Link to="/main">here</Link> to look for parks</h3>
                </div>
            )
        }
    }

    return (
        <>
        {  
            checkedInPlayers && courtName
                ? 

                    <div>
                        {renderContent()}
                    </div>
                :                           
                    <MoonLoader
                        css={override}
                        size={69}
                        color={"orangered"}
                        loading={loading}
                    />
        }
        {
            isCheckedIn === ''
                ?
                    <div style={{'textAlign': 'center', 'marginTop': '2rem', 'fontFamily': "'Do Hyeon', sans-serif"}}>
                        <h1>You are currently not checked in anywhere!</h1>
                        <h3>Click <Link to="/main">here</Link> to look for parks</h3>
                    </div>
                : null
        }
        </>
    )
}

export default withFirebase(MyCheckIn); 