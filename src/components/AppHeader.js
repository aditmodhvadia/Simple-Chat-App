import React from 'react'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'

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
    return (<button onClick={() => {
        firebase.auth().signOut()
    }
    }> Sign Out</button>)
}
export default AppHeader
