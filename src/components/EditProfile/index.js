import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import {
    EditContainer,
    InnerContainer
} from './style';

const EditProfile = ({ firebase, history, currentUser }) => {
    const [profileForm, setProfile] = useState({
        imgUrl: '',
        location: '',
        bio: '',
    })
    const [favSports, setFavSports] = useState({
        sportOne: '',
        sportTwo: '',
        sportThree: ''
    })
    const [socialUrls, setSocialUrls] = useState({
        socialOne: '',
        socialTwo: '',
        socialThree: ''
    })

    const addProfilePic = e => {
        firebase.doAddFile(e.target.files[0])
            .then(file => file.ref.getDownloadURL())
            .then(url => {
                setProfile({ 
                    ...profileForm,
                    imgUrl: url
                })
            })
    }

    const onChange = e => {
        if (e.target.name === 'sportOne' || e.target.name === 'sportTwo' || e.target.name === 'sportThree'){
            setFavSports({
                ...favSports,
                [e.target.name]: e.target.value
            })
        } else if (e.target.name === 'socialOne' || e.target.name === 'socialTwo' || e.target.name === 'socialThree'){
            setSocialUrls({
                ...socialUrls,
                [e.target.name]: e.target.value
            })
        } else {
            setProfile({
                ...profileForm,
                [e.target.name]: e.target.value
            })
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        const user = {
            ...profileForm,
            favoriteSports: [sportOne, sportTwo, sportThree],
            socials: [socialOne, socialTwo,socialThree]
        }
        console.log(user)
        firebase.db.collection('users').doc(currentUser.userId).set(user, {merge: true})
            .then(() => {
                history.push('/main')
            })
            .catch(err => console.log(err))
    }


    const { imgUrl, location, bio } = profileForm;
    const { sportOne, sportTwo, sportThree } = favSports;
    const { socialOne, socialTwo, socialThree } = socialUrls;
    const isInvalid = false; 
    return (
        <EditContainer>
            <InnerContainer>
            <h1>Edit Your Profile</h1>
            <form onSubmit={e => onSubmit(e)}>
                <p>Profile Picture:</p>
                <input type="file" onChange={e => addProfilePic(e)} accept='image/*'/>
                <br/>
                <img src={imgUrl} alt="" style={{'max-width': '8rem'}}/>
                <p>Location:</p>
                <input type='text' name='location' value={location} placeholder="Location" onChange={e => onChange(e)}/>              
                <br/>
                <p>Bio:</p>
                <input type='textarea' name='bio' value={bio} placeholder="Bio - Say something about yourself..." onChange={e => onChange(e)}/>
                <p>Favorite Sports:</p>
                <input type='text' name='sportOne' value={sportOne} placeholder="Fav Sport" onChange={e => onChange(e)}/>
                {
                    sportOne !== ''
                    ?         
                     <input type='text' name='sportTwo' value={sportTwo} placeholder="2nd Fav Sport" onChange={e => onChange(e)}/>
                    : '' 
                }
                {
                    sportTwo !== ''
                    ?            
                     <input type='text' name='sportThree' value={sportThree} placeholder="3rd Fav Sport" onChange={e => onChange(e)}/>
                    : '' 
                }
                <br/>
                <p>Social Links:</p>
                <input type='text' name='socialOne' value={socialOne} placeholder="Social Link" onChange={e => onChange(e)}/>
                {
                    socialOne !== ''
                    ? 
                    <input type='text' name='socialTwo' value={socialTwo} placeholder="2nd Social Link" onChange={e => onChange(e)}/>
                    : ''
                }
                {
                    socialTwo !== ''
                    ? 
                    <input type='text' name='socialThree' value={socialThree} placeholder="3rd Social Link" onChange={e => onChange(e)}/>
                    : ''
                }
                <br/>
                <input type='submit' value='Submit' disabled={isInvalid}/>
            </form>
            </InnerContainer>
        </EditContainer>
    )
}

export default withFirebase(EditProfile);