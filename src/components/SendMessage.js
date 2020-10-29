import React from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';



export const SendMessage = () => {
    const [msg, setMsg] = useState("")
    const [user] = useAuthState(firebase.auth())
    const chatMessagesRef = firebase.firestore().collection('chatmessages')

    const onSendClicked = async (e) => {
        e.preventDefault()
        const { uid, photoURL } = user

        try {
            await chatMessagesRef.add({
                text: msg,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
            })
        } catch (error) {
            // TODO: Show alert to the user 
            console.error("You cannot send messages anymore, you were banned.");
        } finally {
            setMsg('')
        }
    }

    return (
        <div>
            <form>
                <input type="text" value={msg} name="msg" id="msg" placeholder="Enter a message" onChange={(e) => {
                    setMsg(e.target.value)
                }} />
                <Button aria-label="send msg" color="primary" size="medium" variant="contained" onClick={onSendClicked}>
                    <SendIcon />
                </Button>
            </form>
        </div>
    )
}
