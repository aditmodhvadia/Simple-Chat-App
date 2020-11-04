import React, { useState } from 'react';
import 'firebase/firestore';
import { ChatRoom } from '../components/ChatRoom';
import { Grid } from '@material-ui/core';
import { ChatRoomList } from '../components/ChatRoomList';


function ChatScreen() {
    const [selectedChatRoomId, setSelectedChatRoomId] = useState("")

    const onChatRoomClicked = clickedChatRoomId => {
        console.log(clickedChatRoomId);
        if (clickedChatRoomId !== selectedChatRoomId) {
            setSelectedChatRoomId(clickedChatRoomId)
        }
    }


    return (
        <main>
            <Grid container>
                <Grid item md={4}>
                    {/* TODO: Create Channel Button */}
                    <ChatRoomList onChatRoomClicked={onChatRoomClicked} />
                </Grid>
                <Grid item xs={12} md={8}>
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
