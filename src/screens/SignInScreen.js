import React from 'react'
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Box, Container, Typography } from '@material-ui/core';

const firebaseUiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    }
};

function SignInScreen() {
    return (
        <>
            <Box m={3}>
                <Container>
                    <Typography variant="h4" align="center">Login to start messaging with your classmates</Typography>
                </Container>
            </Box>
            <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} />
        </>
    )
}

export default SignInScreen
