import React, { useState, useEffect } from 'react';
import CourtList from '../CourtList';

const Search = () => {
    const [location, setLocation] = useState('');
    const [courts, setCourts] = useState([])

    // async componentDidMount() {
    //     const movieId = this.props.match.params.id;
    //     const resMovie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
    //     const movieJson = await resMovie.json();
    //     console.log(movieJson);
    // }
    const getCourts = async (location) => { 
        try {
            const courts = await fetch(`/api/v1/courts/${location}`);
            const parsedCourts = await courts.json();
            console.log(parsedCourts)
            setCourts(parsedCourts);
        } catch(err){
            console.log(err);
        }
    }

    // useEffect(() => {
    //     getCourts();
    // }, []) 

    // const key = `W9xPCYm2aOXa1Nd1ygsJs4pfWeySayBVWyFhrgbdLczQClTzdoUKOpEKAvmxrLCUmJ3W9BjgWT4YsZOeSqlq3BElFXTlUDmrNgDwaPgnt8W3LtJUOcmrIJ1f8BXfXXYx`
        

    return (
        <>
            <h1>Main Search Component</h1>
            Location: 
            <input type="text" name="search" onChange={(e) => setLocation(e.target.value)} placeholder="Address, neighboorhood, city, or zip"/>
            <button onClick={() => getCourts(location)}>Get Courts</button>
            <CourtList courts={courts}/>
        </>
    )
}
 
export default Search;