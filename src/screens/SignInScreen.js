import React from 'react'
import GoogleButton from 'react-google-button'
import firebase from 'firebase/app'


function SignInScreen() {
    const handleGoogleSignIn = () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(googleAuthProvider)
    }
    return (
        <div>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    )
}

export default SignInScreen
