import React, { useState } from 'react';
import 'firebase/firestore';
import { ChatRoom } from '../components/ChatRoom';
import { Grid, Hidden } from '@material-ui/core';
import { ChatRoomList } from '../components/ChatRoomList';


function ChatScreen() {
    let storedChatRoomId = localStorage.getItem("lastChatRoomId")
    if (!storedChatRoomId) {
        storedChatRoomId = ""
    }
    const [selectedChatRoomId, setSelectedChatRoomId] = useState(storedChatRoomId)

    const onChatRoomClicked = clickedChatRoomId => {
        if (clickedChatRoomId !== selectedChatRoomId) {
            setSelectedChatRoomId(clickedChatRoomId) // update state
            localStorage.setItem("lastChatRoomId", clickedChatRoomId)
        }
    }


    return (
        <main>
            <Grid container>
                <Hidden only="xs">
                    <Grid item sm={2}>
                        {/* TODO: Create Channel Button */}
                        <ChatRoomList onChatRoomClicked={onChatRoomClicked} chatRoomId={selectedChatRoomId} />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={10}>
                    {selectedChatRoomId !== "" ?
                        <ChatRoom chatRoomId={selectedChatRoomId} />
                        :
                        null}
                </Grid>
            </Grid>
        </main>
    );
}



export default ChatScreen;
