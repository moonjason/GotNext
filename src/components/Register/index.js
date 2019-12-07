import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

const Register = (props) => {
    const [userForm, setUserForm] = useState({
        email: '',
        displayName: '',
        password: '',
        password2: '',
        error: null
    })
    // state = {
    //     email: '',
    //     password: '',
    //     passwordTwo: '',
    //     error: null
    // }

    const onChange = e => {
        setUserForm({
            [e.target.name]: e.target.value
        })
    }

    const onSubmit1 = e => {
        e.preventDefault()
        const { email, password } = userForm
        doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                db.collection('users').doc(authUser.user.uid).set({email})
                    .then(docRef => console.log(docRef))
                    .catch(err => console.log(err))
                this.props.history.push('/main')
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    const { email, displayName, password, passwordTwo, error } = userForm
    
    const isInvalid =
            password !== passwordTwo ||
            password === '' ||
            email === ''

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={(e) => onSubmit1(e)}>
                <input type='text' name='email' value={email} placeholder="EMAIL" onChange={(e) => onChange(e)}/>
                <input type='text' name='displayName' value={displayName} placeholder="DISPLAY NAME" onChange={(e) => onChange(e)}/>
                <input type='text' name='password' value={password} placeholder="PASSWORD" onChange={(e) => onChange(e)}/>
                <input type='text' name='passwordTwo' value={passwordTwo} placeholder="PASSWORD" onChange={(e) => onChange(e)}/>
                <input type='submit' value='submit' disabled={isInvalid}/>
                {error && <p>{error.message}</p>}
            </form>
        </div>
    )
}

export default withFirebase(Register)