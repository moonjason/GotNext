import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { 
    Pin,
    CourtContainer,
    ModalWindow,
    ModalClose
 } from './style';

 import { Link } from 'react-router-dom';
 import { withFirebase } from '../Firebase';

const CourtShow = ({ firebase, currentUser, match }) => {
    const [court, setCourt] = useState(null);
    const [viewport, setViewport] = useState({
        width: 400,
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
        console.log(checkInForm.sport)
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
                court && checkedInPlayers
                    ?
                    <>
                        <h1>{court.name}</h1>   
                        <CourtContainer>
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
                        </CourtContainer>

                        {
                            currentUser
                                ?   
                                    <button onClick={() => onClick()}>Check In</button>
                                :   
                                    null
                        }

                        <button onClick={() => removePlayerFromCourt()}>Remove</button>
                        <div>
                            <h4>Basketball</h4>
                            <h5>Player:</h5>
                            <h5>Messages:</h5>
                            <ul>
                                {
                                    checkedInPlayers.map((player, i) => {
                                        return (
                                            <li key={i}>
                                                <Link to={`/main/profile/${player.playerId}`}><p>{player.playerName}</p></Link>
                                                <p>{player.message}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

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
                                    <button type="submit">Check-In</button>
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