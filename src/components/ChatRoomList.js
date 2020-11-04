import React from 'react'
import firebase from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Box, Grid, Typography } from '@material-ui/core';

export const ChatRoomList = props => {
    const chatRoomsRef = firebase.firestore().collection("chatRooms");

    const query = chatRoomsRef.orderBy('createdAt');

    const [chatRooms] = useCollectionData(query, { idField: 'id' });

    const { chatRoomId } = props
    console.log(props);

    return (
        <>
            <Box ml={1}>
                <Typography variant="h5" component="p" >Channels</Typography>
                <section>
                    {chatRooms && chatRooms.map((chatRoom) => {
                        console.log(chatRoomId);
                        console.log(chatRoom.id);
                        const isChatRoomSelected = chatRoomId === chatRoom.id
                        return <ChatRoomItem key={chatRoom.id} isChatRoomSelected={isChatRoomSelected} chatRoom={chatRoom} onChatRoomClick={props.onChatRoomClicked} />
                    }
                    )}
                </section>
            </Box>
        </>

    )
}

const ChatRoomItem = props => {
    const { name, createdAt, lastMsg, id } = props.chatRoom;
    const chatRoomType = props.isChatRoomSelected ? "chat-room-selected" : "chat-room-not-selected"
    return (
        <div className={`chat-room-item ${chatRoomType}`}>
            <div className="chat-room-name">
                <p onClick={() => props.onChatRoomClick(id)}># {name}</p>
            </div>
            <div className="chat-room-last-msg">
                <p>{lastMsg}</p>
            </div>
        </div>
    )
}

