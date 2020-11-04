import React from 'react'
import firebase from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Box, Typography } from '@material-ui/core';
import TimeAgo from 'react-timeago';

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
    const { name, lastMsg, id } = props.chatRoom;
    const chatRoomType = props.isChatRoomSelected ? "chat-room-selected" : "chat-room-not-selected"

    const msgDate = lastMsg.createdAt
        ? new Date(lastMsg.createdAt.seconds * 1000 + lastMsg.createdAt.nanoseconds / 1000000)
        : null;
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

