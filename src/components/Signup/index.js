import React from 'react';

import { withFirebase } from '../Firebase'

const SignUp = (props) => {
    console.log(props.firebase)
    return (
        <div>Sign up page</div>
    )
}

export default withFirebase(SignUp)