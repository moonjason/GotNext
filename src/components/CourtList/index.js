import React from 'react';
import { Link } from 'react-router-dom';

const CourtList = ({ courts }) => {
    return (
        <>
        {
            courts.map(court => {
                return (
                    <Link key={court.id} to={`main/${court.alias}`}>
                        <div>
                            <h2>{court.name}</h2>
                        </div>
                    </Link>
                )
            })
        }
        </>
    )
}

export default CourtList;