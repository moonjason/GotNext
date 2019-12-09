import React from 'react';
import { Link } from 'react-router-dom';

const ProfileShow = ({ currentUser }) => {
    return(
        <>
        {
            currentUser 
                ?
                    <>
                        <h1>Profile Show Page</h1>
                        <img style={{'maxWidth': '10vw'}} src={currentUser.imgUrl} alt="profile"/>
                        <h2>{currentUser.displayName}</h2>
                        <p>Location: </p> <p>{currentUser.location}</p>
                        <p>Bio: </p> <p>{currentUser.bio}</p>
                        <p>Favorite Sports:</p>
                        <ul>
                            {
                                currentUser.favoriteSports.map((sport, i) => {
                                    return <li key={i}>{sport}</li>
                                })
                            }
                        </ul>
                        <p>Socials:</p>
                        <ul>
                            {
                                currentUser.socials.map((social, i) => {
                                    return <li key={i}>{social}</li>
                                })
                            }
                        </ul>
                        <Link exact to={'/main/profile/edit'}>Edit Profile</Link>
                    </>
                : <div>...loading</div>
        }
        </>
    )
}

export default ProfileShow;