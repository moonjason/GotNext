import React from 'react';
import { Link } from 'react-router-dom'
const LandingPage = () => {
    return (
        <>
            <h1>Landing Page</h1>
            <Link to="/main">Find Parks</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </>
    )
}

export default LandingPage; 