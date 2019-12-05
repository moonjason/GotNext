import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl'


const CourtShow = (props) => {
    const [court, setCourt] = useState(null);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        zoom: 14,
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

    return (    
        <> 
            {console.log(court)}
            {  
                court
                ?
                <>
            <h1>{court.name}</h1>
            <img style={{"maxWidth": "22rem", "maxHeight": "22rem"}} src={court.image_url} alt=""/>
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
                >
                    <div>Hi</div>
                </Marker>
            </ReactMapGL>
                </>
                : <div>...loading</div>
            }
        </>
    )
}

export default CourtShow;