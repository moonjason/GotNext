import React from 'react';

const ProfileShow = ({ currentUser }) => {
    return(
        <>
        {
            currentUser 
                ?
                    <>
                        <h1>Profile Show Page</h1>
                        <h2>{currentUser.displayName}</h2>
                        <p>Location: {currentUser.location}</p>
                        <ul>

                        </ul>
                    </>
                : <div>...loading</div>
        }
        </>
    )
}

export default ProfileShow;