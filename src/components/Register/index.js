import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

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
                firebase.db.collection('users').doc(authUser.user.uid).set({email, displayName})
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
        <div>
            <h1>Register</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input type='text' name='email' value={email} placeholder="EMAIL" onChange={(e) => onChange(e)}/>
                <input type='text' name='displayName' value={displayName} placeholder="DISPLAY NAME" onChange={(e) => onChange(e)}/>
                <input type='text' name='password' value={password} placeholder="PASSWORD" onChange={(e) => onChange(e)}/>
                <input type='text' name='password2' value={password2} placeholder="PASSWORD" onChange={(e) => onChange(e)}/>
                <input type='submit' value='submit' disabled={isInvalid}/>
                {error && <p>{error.message}</p>}
            </form>
        </div>
    )
}

export default withFirebase(Register)