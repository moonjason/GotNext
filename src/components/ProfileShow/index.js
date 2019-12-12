import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { ProfileContainer, SetContainerMiddle } from './style';

import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";

const ProfileShow = ({ currentUser, match, firebase }) => {
    const [showUser, setShowUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const override = css`
        display: block;
        margin: 2rem auto;
    `;

    useEffect(() => {
        firebase.db.collection('users').doc(match.params.id).get()
            .then(doc => {
                setShowUser(doc.data())
            }).catch(err => console.log(err))
        setInterval(() =>{
            setLoading(false)
        }, 1000)
    }, [])
    
    return(
        <>
        {
            showUser 
                ?
                    <SetContainerMiddle>
                        <ProfileContainer>
                            <h1>{showUser.displayName.concat("'s")} Profile</h1>
                            <img style={{'maxWidth': '10vw'}} src={showUser.imgUrl} alt="profile"/>
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
                        </ProfileContainer>
                    </SetContainerMiddle>
                :       
                    <MoonLoader
                        css={override}
                        size={69}
                        color={"orangered"}
                        loading={loading}
                    />
        }
        </>
    )
}

export default withFirebase(ProfileShow);