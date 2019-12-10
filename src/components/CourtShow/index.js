import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { 
    Pin,
    CourtContainer,
    ModalWindow,
    ModalClose
 } from './style';

const CourtShow = ({ match }) => {
    const [court, setCourt] = useState(null);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        zoom: 16,
    });
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const getCourt = async () => {
            const court = await fetch(`/api/v1/courts/show/${match.params.court}`);
            const parsedCourt = await court.json();
            setViewport({latitude: parsedCourt.coordinates.latitude, longitude: parsedCourt.coordinates.longitude, ...viewport})
            setCourt(parsedCourt);
        }
        getCourt()
    }, []);

    const onClick = () => {
        setModal(!modal);
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log('submitting form');
    }

    console.log(court)
    return (    
        <> 
            {  
                court
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
                        <button onClick={() => onClick()}>Start a Game</button>
                        <ModalWindow showModal={modal}>
                            <div>
                                <form onSubmit={e => onSubmit(e)}>
                                    <ModalClose title="Close" onClick={() => onClick()}>Close</ModalClose>
                                    <h3>Select a sport</h3>
                                    <select name="sport">
                                        <option value="Basketball">Basketball</option>
                                        <option value="Football">Football</option>
                                    </select>
                                    <br/>
                                    <br/>
                                    <h3>Write a message</h3>
                                    <input type="text" />
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

export default CourtShow;