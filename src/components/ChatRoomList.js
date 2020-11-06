import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Box, Typography } from '@material-ui/core';
import TimeAgo from 'react-timeago';
import { getChatRoomListQuery } from '../firebase-manager';

export const ChatRoomList = props => {
    const query = getChatRoomListQuery()
    const [chatRooms] = useCollectionData(query, { idField: 'id' });

    const { chatRoomId } = props

    return (
        <div className="chat-room-list">
            <Box ml={1}>
                <Typography variant="h5" component="p" >Channels</Typography>
                <section>
                    {chatRooms && chatRooms.map((chatRoom) => {
                        const isChatRoomSelected = chatRoomId === chatRoom.id
                        return <ChatRoomItem key={chatRoom.id} isChatRoomSelected={isChatRoomSelected} chatRoom={chatRoom} onChatRoomClick={props.onChatRoomClicked} />
                    }
                    )}
                </section>
            </Box>
        </div>

    )
}

const ChatRoomItem = props => {
    const { name, lastMsg, id } = props.chatRoom;
    const chatRoomType = props.isChatRoomSelected ? "chat-room-selected" : "chat-room-not-selected"

    const msgDate = lastMsg && lastMsg.createdAt
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

