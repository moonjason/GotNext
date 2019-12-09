import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

const EditProfile = ({ firebase }) => {
    const [profileForm, setProfile] = useState({
        imgUrl: '',
        location: '',
        bio: '',
    })
    const [error, setError] = useState(null)
    const [favSports, setFavSports] = useState({
        sportOne: '',
        sportTwo: '',
        sportThree: ''
    })
    const [socialUrls, setSocialUrls] = useState([])
            // do same thing as setFavsports everywhere


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
        } else if (e.target.name === 'socialUrls'){
            // do same thing as setFavsports everywhere
        } else {
            setProfile({
                ...profileForm,
                [e.target.name]: e.target.value
            })
        }
    }

    const onSubmit = () => {
        console.log('submitting!!!')
        //find userid in firestore
        //add these new properties to that user
    }


    const { imgUrl, location, bio } = profileForm;
    const { sportOne, sportTwo, sportThree } = favSports;
    const isInvalid = false; 
    return (
        <>
            <h1>Edit Your Profile</h1>
            <form onSubmit={() => onSubmit()}>
                Profile Picture:
                <input type="file" onChange={e => addProfilePic(e)} accept='image/*'/>
                <img src={imgUrl} alt=""/>
                Location:
                <input type='text' name='location' value={location} placeholder="Location" onChange={e => onChange(e)}/>                
                Bio:
                <input type='text' name='bio' value={bio} placeholder="Bio - Say something about yourself..." onChange={e => onChange(e)}/>
                Favorite Sports:
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
                
                Social Links:
                <input type='text' name='socialUrls' value={socialUrls[0]} placeholder="Social Link" onChange={e => onChange(e)}/>
                {
                    socialUrls.length > 0
                    ? 
                    <input type='text' name='socialUrls' value={socialUrls[1]} placeholder="2nd Social Link" onChange={e => onChange(e)}/>
                    : ''
                }
                {
                    socialUrls.length > 1
                    ? 
                    <input type='text' name='socialUrls' value={socialUrls[2]} placeholder="3rd Social Link" onChange={e => onChange(e)}/>
                    : ''
                }

                <input type='submit' value='submit' disabled={isInvalid}/>
                {error ? <p>{error}</p> : ''}
            </form>
        </>
    )
}

export default withFirebase(EditProfile);