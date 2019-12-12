import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import {
    Container,
    InnerContainer,
    Title
} from './style';

const Login = ({ firebase, history }) => {
    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
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
        const { email, password } = userForm
        firebase.doSignIn(email, password)
            .then(authUser => {
                history.push('/main')
            })
            .catch(error => {
                setError({ error })
            })
    }

    const { email, password } = userForm
    const { error } = errorMsg

    const isInvalid =
            password === '' ||
            email === ''

    return (
        <Container>
            <InnerContainer>
                <Title>GotNEXT<img src="./images/gotnextpic.png" style={{'maxWidth': '4rem'}} alt=""/></Title>
                <h1>Login</h1>
                <form onSubmit={(e) => onSubmit(e)}>
                    <p>Email:</p>
                    <input type='text' name='email' value={email} placeholder="EMAIL" onChange={(e) => onChange(e)}/>
                    <p>Password:</p>
                    <input type='password' name='password' value={password} placeholder="PASSWORD" onChange={(e) => onChange(e)}/>
                    <br/>
                    <input type='submit' value='submit' disabled={isInvalid}/>
                    {error && <p>{error.message}</p>}
                </form>
            </InnerContainer>
        </Container>
    )
}

export default withFirebase(Login); 