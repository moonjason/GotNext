import React from 'react';

import { withFirebase } from '../Firebase';

const Register = (props) => {
    console.log(props.firebase)
    return (
        <div>Register page</div>
    )
}

export default withFirebase(Register)