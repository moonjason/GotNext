import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const ProfileShow = ({ currentUser, match, firebase }) => {
    const [showUser, setShowUser] = useState(null)

    useEffect(() => {
        firebase.db.collection('users').doc(match.params.id).get()
            .then(doc => {
                setShowUser(doc.data())
            }).catch(err => console.log(err))
    }, [])
    
    return(
        <>
        {
            showUser 
                ?
                    <>
                        <h1>Profile Show Page</h1>
                        <img style={{'maxWidth': '10vw'}} src={showUser.imgUrl} alt="profile"/>
                        <h2>{showUser.displayName}</h2>
                        <p>Location: </p> <p>{showUser.location}</p>
                        <p>Bio: </p> <p>{showUser.bio}</p>
                        <p>Favorite Sports:</p>
                        <ul>
                            {
                                showUser.favoriteSports.map((sport, i) => {
                                    return <li key={i}>{sport}</li>
                                })
                            }
                        </ul>
                        <p>Socials:</p>
                        <ul>
                            {
                                showUser.socials.map((social, i) => {
                                    return <li key={i}>{social}</li>
                                })
                            }
                        </ul>
                        {showUser.userId === match.params.id
                            ? <Link to={'/main/profile/edit'}>Edit Profile</Link>
                            : null
                        }
                    </>
                : <div>...loading</div>
        }
        </>
    )
}

export default withFirebase(ProfileShow);