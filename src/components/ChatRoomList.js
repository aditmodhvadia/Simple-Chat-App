import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@material-ui/core';
import TimeAgo from 'react-timeago';
import { createNewChannel } from '../firebase-manager';
import IconButton from '@material-ui/core/IconButton';
import { getDateFromTimestamp, getClassNameForChatRoomType } from '../helpers/ChatRoomHelper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { isValidString } from '../helpers/Util';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app'

export const ChatRoomList = ({ selectedChatRoomId, chatRooms, onChatRoomClicked }) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="chat-room-list">
            <Box ml={1}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5" component="p" >Channels </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleClickOpen} color="primary" aria-label="create channel" component="span">
                            <AddCircleIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <section>
                    {chatRooms && chatRooms.map((chatRoom) => {
                        const isChatRoomSelected = selectedChatRoomId === chatRoom.id

                        return <ChatRoomItem key={chatRoom.id} isChatRoomSelected={isChatRoomSelected} chatRoom={chatRoom} onChatRoomClick={onChatRoomClicked} />
                    }
                    )}
                </section>
            </Box>
            <AddChannelDialog open={open} handleClose={handleClose} />
        </div>

    )
}

const ChatRoomItem = props => {
    const { name, lastMsg, id } = props.chatRoom;
    const chatRoomType = getClassNameForChatRoomType(props.isChatRoomSelected)

    const msgDate = lastMsg && getDateFromTimestamp(lastMsg.createdAt)
    const timeAgo = msgDate ? <TimeAgo date={msgDate} /> : null;

    return (
        <div className={`chat-room-item ${chatRoomType}`} onClick={() => props.onChatRoomClick(id)}>
            <div className="chat-room-name">
                <Typography variant="h6"># {name}</Typography>
            </div>
            <div className="chat-room-last-msg">
                <p className="msg-text">{lastMsg && lastMsg.text}</p>
                <Box ml={1}>
                    <p className="msg-time">{timeAgo}</p>
                </Box>
            </div>
        </div>
    )
}

const AddChannelDialog = props => {
    const { open, handleClose } = props
    const [channelName, setChannelName] = useState("")
    const [user] = useAuthState(firebase.auth())


    const onCreateChannelClicked = async () => {
        if (!isValidString(channelName)) {
            return;
        }
        await createNewChannel(channelName, user.uid)
        handleClose()
    }

    return (
        <Dialog open={open} onClose={() => {
            handleClose()
            setChannelName("")
        }} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Channel</DialogTitle>
            <DialogContent>
                {/* <DialogContentText></DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="channel-name"
                    label="Channel Name"
                    value={channelName}
                    onChange={(event) => {
                        setChannelName(event.target.value)
                    }}
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                        </Button>
                <Button onClick={onCreateChannelClicked} color="primary">
                    Create
                        </Button>
            </DialogActions>
        </Dialog>
    )
}
