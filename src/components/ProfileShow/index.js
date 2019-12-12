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
                    <>
                    <SetContainerMiddle>
                        <ProfileContainer>
                            <h1 style={{"fontFamily": "'Do Hyeon', sans-serif", "fontSize": "3rem"}}>{showUser.displayName.concat("'s")} Profile</h1>
                            <br/>
                            <img style={{'maxWidth': '10vw'}} src={showUser.imgUrl} alt="profile"/>
                            <br/>
                            <h3>Location: </h3> <p>{showUser.location}</p>
                            <br/>
                            <h3>Bio: </h3> <p>{showUser.bio}</p>
                            <br/>
                            <h3>Favorite Sports:</h3>
                            {
                                showUser.favoriteSports.map((sport, i) => {
                                    return <p key={i}>{sport}</p>
                                })
                            }
                            <br/>
                            <h3>Socials:</h3>
                            {
                                showUser.socials.map((social, i) => {
                                    return <p key={i}>{social}</p>
                                })
                            }
                            <br/>
                        </ProfileContainer>
                    </SetContainerMiddle>
                    {
                        currentUser
                            ? currentUser.userId === match.params.id ?  <Link to={'/main/profile/edit'}>Edit Profile</Link> : null
                            : null
                    }
                    </>
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