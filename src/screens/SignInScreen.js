import React from 'react'
import GoogleButton from 'react-google-button'
import firebase from 'firebase/app'
import { Container } from '@material-ui/core'


function SignInScreen() {
    const handleGoogleSignIn = () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(googleAuthProvider)
    }

    const handleFacebookSignIn = () => {
        console.log("Function called");
        const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
        facebookAuthProvider.addScope('email');
        // facebookAuthProvider.addScope('profile_photo');
        firebase.auth().signInWithPopup(facebookAuthProvider).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        })
    }
    return (
        <Container maxWidth="sm">
            <GoogleButton onClick={handleGoogleSignIn} />
            <button onClick={handleFacebookSignIn}>Facebook</button>
            <div className="fb-login-button" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true" data-width="" onClick={handleFacebookSignIn}></div>
        </Container >
    )
}

export default SignInScreen
