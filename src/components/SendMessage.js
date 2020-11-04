import React from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Box, Button, createStyles, makeStyles, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => createStyles({
    sendMsg: {
        background: theme.palette.secondary.main,
        padding: theme.spacing(2),
        // width: "100%",
        // position: "position",
        // bottom: "0",
        borderRadius: "8px",
        // position: "fixed",
    },
    msgInputBox: {
        width: "90%",
    },
    msgInput: {
        background: theme.palette.secondary.main,
        color: "#fff",
    }
}));

export const SendMessage = props => {
    const { chatRoomId } = props
    console.log(`Room id is ${chatRoomId}`);
    const [msg, setMsg] = useState("")
    const [user] = useAuthState(firebase.auth())
    const chatMessagesRef = chatRoomId ? firebase.firestore().collection('chatRooms').doc(chatRoomId).collection("messages") : null


    const onSendClicked = async (e) => {
        e.preventDefault()
        const { uid, photoURL, displayName } = user

        try {
            console.log(displayName);
            await chatMessagesRef.add({
                text: msg,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                displayName
            })
        } catch (error) {
            // TODO: Show alert to the user 
            console.error(error);
            console.error("You cannot send messages anymore, you were banned.");
        } finally {
            setMsg('')
        }
    }
    const classes = useStyles();

    return (
        <div className="send-msg-container">
            <form className={classes.sendMsg} action="POST" onSubmit={onSendClicked}>
                <TextField className={classes.msgInput} type="text"
                    value={msg} name="msg" id="msg" placeholder="Type a message here"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        className: classes.msgInput
                    }}
                    onChange={(e) => {
                        setMsg(e.target.value)
                    }} />
                <Box ml={2}>
                    <Button className="send-btn" aria-label="send msg" color="primary" size="medium" variant="contained" onClick={onSendClicked}>
                        <SendIcon />
                    </Button>
                </Box>
            </form>
        </div>
    )
}
