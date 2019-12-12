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
    Messages,
    CenterContainer,
    StyledBtn,
    CardTitle,
    CardPlayersTitle,
    CardMessagesTitle,
    CardAddressTitle,
    CardCategoriesTitle,
    CardContactTitle,
    DetailP,
    PlayerP,
    ModalInput,
    CourtDetailP
} from './style';

import { css } from "@emotion/core";
import { Link } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";

import { withFirebase } from '../Firebase';

const override = css`
  display: block;
  margin: 2rem auto;
`; 

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
    const [loading, setLoading] = useState(true)

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
        setTimeout(() => { 
            setLoading(false);
        }, 1200)
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
                        <div style={{'textAlign': 'center', 'padding': '2rem'}}>
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
                                            <CardTitle>Park Details</CardTitle>
                                        </SportTitle>
                                        <CourtDiv>
                                            <Players>
                                                <br/>
                                                <CardAddressTitle><u>Address</u></CardAddressTitle>
                                                    { court.location.display_address.map((address, i) => 
                                                        <CourtDetailP key={i}>{address}</CourtDetailP>
                                                    )}
                                                <br/>
                                                <CardCategoriesTitle><u>Categories</u></CardCategoriesTitle>
                                                    { court.categories.map((cat, i) => 
                                                        <CourtDetailP key={i}>{cat.title}</CourtDetailP>
                                                    )}
                                                <br/>
                                                <CardContactTitle><u>Contact</u></CardContactTitle>
                                                    <CourtDetailP>{court.display_phone}</CourtDetailP>
                                            </Players>
                                        </CourtDiv>
                                    </SportDiv>
                                </Container2>
                                {
                                    checkedInPlayers
                                        ?
                                        <Container3>
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
                                        </Container3>
                                        : null 
                                }
                            </Container1>
                        </CenterContainer>

                        <ModalWindow showModal={modal}>
                            <div>
                                <form onSubmit={e => onSubmit(e)}>
                                    <ModalClose title="Close" onClick={() => onClick()}>Close</ModalClose>
                                    <h3>Select a sport</h3>
                                    <br/>
                                    <select name="sport" onChange={e => onChange(e)}>
                                        <option value="Basketball">Basketball</option>
                                        <option value="Football" disabled>Football</option>
                                    </select>
                                    <br/>
                                    <br/>
                                    <h3>Write a message</h3>
                                    <br/>
                                    <ModalInput type="text" name="message" value={checkInForm.message} onChange={e => onChange(e)}/>
                                    <br/>
                                    <br/>
                                    <StyledBtn checkIn={true} type="submit">Check-In</StyledBtn>
                                </form>
                            </div>
                        </ModalWindow>
                    </>
                    : 
                        <MoonLoader
                            css={override}
                            size={69}
                            color={"orangered"}
                            loading={loading}
                        />
            }
        </>
    )
}

export default withFirebase(CourtShow);