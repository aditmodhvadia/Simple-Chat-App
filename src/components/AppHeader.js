import React from 'react'
import firebase from 'firebase/app'
import { Box, Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AppHeader = ({ isUserSignedIn }) => {
    return (
        <header>
            <Box mr={2} ml={2}>
                <p className="branding">Simple Chat App</p>
            </Box>
            {isUserSignedIn ? <SignOutButton /> : null}
        </header>
    )
}

const SignOutButton = () => {
    return (
        <Box mr={1}>
            <Button variant="contained" disableElevation size="large" color="secondary" className="sign-out" startIcon={<ExitToAppIcon style={{
                transform: "rotateY(180deg)"
            }} />} onClick={() => {
                firebase.auth().signOut()
            }
            }> Sign Out</Button>
        </Box>
    )
}
export default AppHeader
