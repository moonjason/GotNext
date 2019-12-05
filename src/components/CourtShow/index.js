import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl'

const CourtShow = (props) => {
    const [court, setCourt] = useState([]);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        zoom: 10,
    });

    useEffect(() => {
        const getCourt = async () => {
            const courtId = props.match.params.court
            const court = await fetch(`/api/v1/courts/show/${courtId}`);
            const parsedCourt = await court.json();
            console.log(parsedCourt)
            setCourt(parsedCourt);
            setViewport({latitude: parsedCourt.coordinates.latitude, longitude: parsedCourt.coordinates.longitude, ...viewport})
        }
        getCourt();
    }, [])

    // async componentDidMount() {
    //     const movieId = this.props.match.params.id;
    //     const resMovie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
    //     const movieJson = await resMovie.json();
    //     console.log(movieJson);
    // }

    console.log(viewport)
    console.log(court)
    return (
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
            />
        </>
    )
}

export default CourtShow;