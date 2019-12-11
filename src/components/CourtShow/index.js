import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { 
    Pin,
    CourtContainer,
    ModalWindow,
    ModalClose,
    MapBorder,
    CourtTitle,
    Container1,
    Container2,
    Container3,
    SportTitle,
    SportDiv,
    CourtDiv,
    Players,
    PlayerHeading,
    PlayerList,
    PlayerBody,
    Messages,
    MessageHeading,
    MessageList,
    MessageBody,
    CenterContainer,
    StyledBtn
 } from './style';

 import { Link } from 'react-router-dom';
 import { withFirebase } from '../Firebase';

const CourtShow = ({ firebase, currentUser, match }) => {
    const [court, setCourt] = useState(null);
    const [viewport, setViewport] = useState({
        width: '90vw',
        height: 400,
        zoom: 16,
    });
    const [modal, setModal] = useState(false);
    const [checkInForm, setCheckInForm] = useState({
        sport: 'Basketball',
        message: ''
    })
    const [checkedInPlayers, setCheckedInPlayers] = useState();

    useEffect(() => {
        const getCourt = async () => {
            const court = await fetch(`/api/v1/courts/show/${match.params.court}`);
            const parsedCourt = await court.json();
            setViewport({latitude: parsedCourt.coordinates.latitude, longitude: parsedCourt.coordinates.longitude, ...viewport})
            setCourt(parsedCourt);
            firebase.db.collection('courts').doc(parsedCourt.id).get()
                .then(doc => {
                    if (doc.exists) {
                        setCheckedInPlayers([...doc.data().Basketball])
                        firebase.db.collection('courts').doc(parsedCourt.id).onSnapshot(snapshot => setCheckedInPlayers([...snapshot.data().Basketball]))
                    }
                })
                .catch(err => console.log(err))
        }
        getCourt();
    }, []);

    const onClick = () => {
        setModal(!modal);
    }
 
    const onChange = e => {
        setCheckInForm({
            ...checkInForm,
            [e.target.name]: e.target.value
        })
    }

    const removePlayerFromCourt = () => {
        const removedPlayer = checkedInPlayers.filter(player => player.playerId !== currentUser.userId )
        console.log(removedPlayer)
        firebase.db.collection('courts').doc(court.id).update({
            Basketball: removedPlayer
        }).then(() => {
            firebase.db.collection('users').doc(currentUser.userId).update({
                isCheckedIn: false,
                currentCheckIn: ''
            })
        })
        .catch(err => console.log(err))
    } 

    const onSubmit = e => {
        e.preventDefault();
        firebase.db.collection('courts').doc(court.id).get()
            .then(doc => {
                if (doc.exists){
                    firebase.db.collection('courts').doc(court.id).update({
                        [checkInForm.sport]: [...doc.data()[checkInForm.sport], { playerId: currentUser.userId, playerName: currentUser.displayName, message: checkInForm.message} ]
                    }).then(() => {
                        firebase.db.collection('users').doc(currentUser.userId).update({
                            isCheckedIn: true,
                            currentCheckIn: court.id
                        })
                        setModal(false);
                    }).catch(err => console.log(err))
                } else {
                    firebase.db.collection('courts').doc(court.id).set({
                        courtName: court.name,
                        [checkInForm.sport]: [{ playerId: currentUser.userId, playerName: currentUser.displayName, message: checkInForm.message}]
                    }).then(() => {
                        firebase.db.collection('users').doc(currentUser.userId).update({
                            isCheckedIn: true,
                            currentCheckIn: court.id
                        })
                        setModal(false);
                    }).catch(err => console.log(err))
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    return (    
        <> 
            {  
                court && 
                // checkedInPlayers && 
                currentUser
                    ?
                    <>
                        <CourtTitle>{court.name}</CourtTitle>
                        <CourtContainer>
                            <MapBorder>
                                <ReactMapGL 
                                    {...viewport} 
                                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                                    mapStyle="mapbox://styles/moonjason/ck3sd120z0xnq1cpu84vv7ki4" 
                                    onViewportChange={viewport => {
                                        setViewport(viewport);
                                    }}
                                    >
                                    <Marker
                                        latitude={court.coordinates.latitude}
                                        longitude={court.coordinates.longitude}
                                        offsetLeft={-25}
                                        offsetTop={-50}
                                        >
                                        <Pin src="/images/pin.png" alt="map marker"/>
                                    </Marker>
                                </ReactMapGL>
                            </MapBorder>
                        </CourtContainer>
                        <div style={{'text-align': 'center', 'padding': '2rem'}}>
                        {
                            currentUser
                                ?   
                                    <StyledBtn checkIn={true} onClick={() => onClick()}>Check In</StyledBtn>
                                :   
                                    null
                        }
                        {
                            currentUser.currentCheckIn === court.id
                                ?  <StyledBtn checkIn={false} onClick={() => removePlayerFromCourt()}>Leave</StyledBtn>
                                :  null 
                        }
                        </div>

                        <CenterContainer>
                            <Container1>
                                <Container2>
                                    <SportDiv>
                                        <SportTitle>
                                            <h1>Park Details</h1>
                                        </SportTitle>
                                        <CourtDiv>
                                            <Players>
                                                <h2><u>Address</u></h2>
                                                <p>Lookster Chang</p>
                                            </Players>
                                        </CourtDiv>
                                    </SportDiv>
                                </Container2>
                                <Container3>
                                    <SportDiv>
                                        <SportTitle>
                                            <h1>Basketball</h1>
                                        </SportTitle>
                                        <CourtDiv>
                                            <Players>
                                                <h2><u>Players</u></h2>
                                                <p>Lookster Chang</p>
                                            </Players>
                                            <Messages>
                                                <h2><u>Messages</u></h2>
                                                <p>Hi I'm gay</p>
                                            </Messages>
                                        </CourtDiv>
                                    </SportDiv>
                                </Container3>
                            </Container1>
                        </CenterContainer>

                        <ModalWindow showModal={modal}>
                            <div>
                                <form onSubmit={e => onSubmit(e)}>
                                    <ModalClose title="Close" onClick={() => onClick()}>Close</ModalClose>
                                    <h3>Select a sport</h3>
                                    <select name="sport" onChange={e => onChange(e)}>
                                        <option value="Basketball">Basketball</option>
                                        <option value="Football">Football</option>
                                    </select>
                                    <br/>
                                    <br/>
                                    <h3>Write a message</h3>
                                    <input type="text" name="message" value={checkInForm.message} onChange={e => onChange(e)}/>
                                    <br/>
                                    <br/>
                                    <StyledBtn checkIn={true} type="submit">Check-In</StyledBtn>
                                </form>
                            </div>
                        </ModalWindow>
                    </>
                    : 
                        <div>...loading</div>
            }
        </>
    )
}

export default withFirebase(CourtShow);