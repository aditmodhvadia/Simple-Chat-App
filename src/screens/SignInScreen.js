import React from 'react'
import GoogleButton from 'react-google-button'
import firebase from 'firebase/app'
import { Container } from '@material-ui/core'


function SignInScreen() {
    const handleGoogleSignIn = () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(googleAuthProvider)
    }
    return (
        <Container maxWidth="sm">
            <GoogleButton onClick={handleGoogleSignIn} />
        </Container>
    )
}

export default SignInScreen
