import React from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



export const SendMessage = () => {
    const [msg, setMsg] = useState("")
    const [user] = useAuthState(firebase.auth())
    const chatMessagesRef = firebase.firestore().collection('chatmessages')

    const onSendClicked = async (e) => {
        e.preventDefault()
        const { uid, photoURL } = user

        await chatMessagesRef.add({
            text: msg,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setMsg('')
    }

    return (
        <div>
            <form>
                <input type="text" value={msg} name="msg" id="msg" placeholder="Enter a message" onChange={(e) => {
                    setMsg(e.target.value)
                }} />
                <button onClick={onSendClicked}>Send</button>
            </form>
        </div>
    )
}
