import React, { useState } from 'react';
import CourtList from '../CourtList';
import NavBar from '../NavBar';

const Main = ({ currentUser }) => {
    const [location, setLocation] = useState('');
    const [courts, setCourts] = useState([]);

    const getCourts = async (location) => { 
        try {
            const courts = await fetch(`/api/v1/courts/${location}`);
            const parsedCourts = await courts.json();
            console.log(parsedCourts);
            setCourts(parsedCourts);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <>
            {
                currentUser || currentUser === null
                     ?
                        <>
                            <NavBar currentUser={currentUser}/>
                            <h1>Main Search Component</h1>
                            Location: 
                            <input type="text" name="search" onChange={(e) => setLocation(e.target.value)} placeholder="Address, neighboorhood, city, or zip"/>
                            <button onClick={() => getCourts(location)}>Get Courts</button>
                            <CourtList courts={courts}/>
                        </>
                    :   
                        <div>...loading</div>
            }
        </>
    )
}
 
export default Main;