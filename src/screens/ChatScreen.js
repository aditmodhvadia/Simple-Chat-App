import React, { useState } from 'react';
import 'firebase/firestore';
import { ChatRoom } from '../components/ChatRoom';
import { Grid, Hidden } from '@material-ui/core';
import { ChatRoomList } from '../components/ChatRoomList';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getChatRoomListQuery } from '../firebase-manager';


function ChatScreen() {
    let storedChatRoomId = localStorage.getItem("lastChatRoomId") ? localStorage.getItem("lastChatRoomId") : ""

    const [selectedChatRoomId, setSelectedChatRoomId] = useState(storedChatRoomId)

    const onChatRoomClicked = clickedChatRoomId => {
        if (clickedChatRoomId !== selectedChatRoomId) {
            setSelectedChatRoomId(clickedChatRoomId) // update state
            localStorage.setItem("lastChatRoomId", clickedChatRoomId)
        }
    }

    const [chatRooms] = useCollectionData(getChatRoomListQuery(), { idField: 'id' });

    return (
        <main>
            <Grid container>
                <Hidden only="xs">
                    <Grid item sm={2}>
                        {/* TODO: Create Channel Button */}
                        <ChatRoomList onChatRoomClicked={onChatRoomClicked} selectedChatRoomId={selectedChatRoomId} chatRooms={chatRooms} />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={10}>
                    {selectedChatRoomId !== "" ?
                        <ChatRoom chatRoomId={selectedChatRoomId} />
                        :
                        <div className="chat-room-name">Enter a chat room to start sending messages.</div>}
                </Grid>
            </Grid>
        </main>
    );
}



export default ChatScreen;
