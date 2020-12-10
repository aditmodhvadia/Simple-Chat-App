import React from 'react'
import firebase from 'firebase/app'
import { Box, Button, Hidden, IconButton } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';

const AppHeader = ({ isUserSignedIn }) => {
    return (
        <header>
            {isUserSignedIn ? <HamburgerMenu /> : null}
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

const HamburgerMenu = () => {
    return (
        <Hidden smUp>
            <Box ml={1}>
                <IconButton aria-label="side menu">
                    <MenuIcon onClick={() => { }} />
                </IconButton>
            </Box>
        </Hidden>
    )
}

export default AppHeader
