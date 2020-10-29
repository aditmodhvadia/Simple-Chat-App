import React from 'react'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function AppHeader() {
    const [user] = useAuthState(firebase.auth())


    return (
        <header>
            <h1>This is the app header</h1>
            {user ? <SignOutButton /> : null}
        </header>
    )
}

const SignOutButton = () => {
    return (<Button variant="contained" color="secondary" startIcon={<ExitToAppIcon style={{
        transform: "rotateY(180deg)"
    }} />} onClick={() => {
        firebase.auth().signOut()
    }
    }> Sign Out</Button>)
}
export default AppHeader
