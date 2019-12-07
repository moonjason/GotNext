import React, { useState, useEffect } from 'react';

import ReactMapGL, { Marker } from 'react-map-gl';

import { 
    Pin,
    CourtContainer
 } from './style';


const CourtShow = (props) => {
    const [court, setCourt] = useState(null);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        zoom: 15,
    });

    useEffect(() => {
        const getCourt = async () => {
            const court = await fetch(`/api/v1/courts/show/${props.match.params.court}`);
            const parsedCourt = await court.json();
            setViewport({latitude: parsedCourt.coordinates.latitude, longitude: parsedCourt.coordinates.longitude, ...viewport})
            setCourt(parsedCourt);
        }
        getCourt()
    }, []);


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
                    </>
                    : 
                        <div>...loading</div>
            }
        </>
    )
}

export default CourtShow;