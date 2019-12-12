import React, { useState } from 'react';
import CourtList from '../CourtList';

import {
    MainTitle,
    Instruction,
    SearchBar,
    MainContainer,
    StyledBtn
} from './style'

const Main = () => {
    const [location, setLocation] = useState('');
    const [courts, setCourts] = useState([]);

    const getCourts = async (location) => { 
        try {
            const courts = await fetch(`/api/v1/courts/${location}`);
            const parsedCourts = await courts.json();
            setCourts(parsedCourts);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <MainContainer>
            <MainTitle>Search for a Park</MainTitle>
            <Instruction>Enter a Location:</Instruction>
            <SearchBar type="text" name="search" onChange={(e) => setLocation(e.target.value)} placeholder="Address, neighboorhood, city, or zip"/>
            <br/>
            <StyledBtn onClick={() => getCourts(location)}>Get Courts</StyledBtn>
            <CourtList courts={courts}/>
        </MainContainer>
    )
}
 
export default Main;