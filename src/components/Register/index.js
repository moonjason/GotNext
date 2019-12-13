import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import {
    Container,
    InnerContainer,
    Title,
    StyledBtn
} from './style';
const Register = ({ firebase, history }) => {
    const [userForm, setUserForm] = useState({
        email: '',
        displayName: '',
        password: '',
        password2: '',
    })
    const [errorMsg, setError] = useState({ error: null })

    const onChange = e => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        const { email, displayName, password } = userForm
        firebase.doCreateUser(email, password)
            .then(authUser => {
                firebase.db.collection('users').doc(authUser.user.uid).set({email, displayName, isCheckedIn: false, currentCheckIn: '', userId: authUser.user.uid})
                    .then(docRef => console.log(docRef))
                    .catch(err => console.log(err))
                history.push('/main/profile/edit')
            })
            .catch(error => {
                setError({ error })
            })
    }

    const { email, displayName, password, password2 } = userForm
    const { error } = errorMsg

    const isInvalid =
            password !== password2 ||
            password === '' ||
            email === ''

    return (
        <Container>
            <InnerContainer>
                <Title>GotNEXT<img src="./images/gotnextpic.png" style={{'maxWidth': '4rem'}} alt=""/></Title>
                <h1>Register</h1>
                <form onSubmit={(e) => onSubmit(e)}>
                    <p>Email:</p>
                    <input type='text' name='email' value={email} placeholder="EMAIL" onChange={(e) => onChange(e)}/>
                    <br/>
                    <p>Display Name:</p>
                    <input type='text' name='displayName' value={displayName} placeholder="DISPLAY NAME" onChange={(e) => onChange(e)}/>
                    <br/>
                    <p>Password:</p>
                    <input type='password' name='password' value={password} placeholder="PASSWORD" onChange={(e) => onChange(e)}/>
                    <br/>
                    <p>Confirm Password:</p>
                    <input type='password' name='password2' value={password2} placeholder="PASSWORD" onChange={(e) => onChange(e)}/>
                    <br/>
                    <StyledBtn type='submit' value='Register' disabled={isInvalid}/>
                    {error && <p>{error.message}</p>}
                </form>
            </InnerContainer>
        </Container>
    )
}

export default withFirebase(Register)