import React from 'react'
import firebase from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Typography } from '@material-ui/core';

export const ChatRoomList = props => {
    const chatRoomsRef = firebase.firestore().collection("chatRooms");

    const query = chatRoomsRef.orderBy('createdAt');

    const [chatRooms] = useCollectionData(query, { idField: 'id' });

    console.log(chatRooms);

    return (
        <section>
            <Typography>Channels</Typography>
            {chatRooms && chatRooms.map((chatRoom, i) => {
                return <ChatRoomItem key={chatRoom.id} chatRoom={chatRoom} onChatRoomClick={props.onChatRoomClicked} />
            }
            )}
        </section>
    )
}

const ChatRoomItem = props => {
    console.log(props);
    const { name, createdAt, lastMsg, id } = props.chatRoom;

    return (
        <div>
            <p onClick={() => props.onChatRoomClick(id)}>{name}</p>
        </div>
    )
}

