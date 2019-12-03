import React, { useState, useEffect } from 'react';

const Search = () => {
    const [searchTerm, setSearch] = useState('');

    // useEffect (() => {
    //     getCourts();
    // }) 

    // const key = `W9xPCYm2aOXa1Nd1ygsJs4pfWeySayBVWyFhrgbdLczQClTzdoUKOpEKAvmxrLCUmJ3W9BjgWT4YsZOeSqlq3BElFXTlUDmrNgDwaPgnt8W3LtJUOcmrIJ1f8BXfXXYx`
        
    // const getCourts = async () => { 
    //     console.log('hey')
    //     try {
    //         const courts = await fetch(`https://api.yelp.com/v3/businesses/search?term=basketball%20courts&location=Los%20Angeles`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${key}`
    //             } 
    //         });
    //         const parsedCourts = await courts.json();
    //         console.log(parsedCourts)
    //     } catch(err){
    //         console.log(err);
    //     }
    // }

    return (
        <>
            <div>Search</div>
            <input type="text" name="search" onChange={(e) => setSearch(e.target.value)} />
        </>
    )
}
 
export default Search;