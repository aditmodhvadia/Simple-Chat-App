import React from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Box, Button, Container, createStyles, makeStyles, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { sendNewMessage } from '../firebase-manager'


const useStyles = makeStyles((theme) => createStyles({
    sendMsg: {
        // background: theme.palette.secondary.main,
        padding: theme.spacing(2),
        // width: "100%",
        // position: "position",
        // bottom: "0",
        borderRadius: "8px",
        // position: "fixed",
    },
    msgInput: {
        background: "#34515e",
        color: "#fff",
    }
}));

export const SendMessage = props => {
    const { chatRoomId } = props
    const [msg, setMsg] = useState("")
    const [user] = useAuthState(firebase.auth())

    const onSendClicked = async (e) => {
        e.preventDefault()
        if (msg === undefined || msg.trim() === "") {
            return;
        }
        try {
            await sendNewMessage(chatRoomId, { ...user, msg })
            console.log("Msg sent");
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
                <TextField className={`send-msg-input ${classes.msgInput}`} type="text"
                    value={msg} name="msg" id="msg" placeholder="Type a message here"
                    variant="outlined"
                    autoComplete='off'
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
