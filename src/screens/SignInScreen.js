import React from 'react'
import GoogleButton from 'react-google-button'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth';




function SignInScreen() {
    const [user] = useAuthState(firebase.auth())
    console.log(user);

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
