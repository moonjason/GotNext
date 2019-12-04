import React from 'react';

const CourtList = ({ courts }) => {
    return (
        courts.map(court => {
            return (
                <div key={court.id}>
                    <h2>{court.name}</h2>
                    <img style={{"width": "10%","height": "10%" }} src={court.image_url}/>
                </div>
            )
        })
    )
}

export default CourtList;