import React, { useEffect, useRef } from 'react'
import firebase from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import dateFormat from 'dateformat';
import { SendMessage } from './SendMessage';
import TimeAgo from 'react-timeago';
import { getChatRoomMessagesQuery } from '../firebase-manager';
import { getClassNameForMsgSender, getDateFromTimestamp, isSenderUser, shouldShowMsgDetails } from '../helpers/ChatRoomHelper'

export const ChatRoom = props => {
    const { chatRoomId } = props

    const [messages] = useCollectionData(getChatRoomMessagesQuery(chatRoomId), { idField: 'id' });

    const scrollTo = useRef()

    // automatically scroll to the bottom of the msgs when messages are updated
    useEffect(() => {
        scrollTo.current.scrollIntoView()
    }, [messages])


    return (
        <section className="scrollable vh-80">
            {messages && messages.reverse().map((msg, i) => {
                let showMsgDetails = shouldShowMsgDetails(messages, i)

                return <ChatMessage key={msg.id} message={msg} showMsgDetails={showMsgDetails} />
            }
            )}
            <div ref={scrollTo}></div>
            <SendMessage chatRoomId={chatRoomId} />
        </section>

    )
}

function ChatMessage(props) {
    const [user] = useAuthState(firebase.auth())
    const { uid } = user
    const { uid: msgSenderUid, text, photoURL, createdAt, displayName } = props.message;

    const messageSender = getClassNameForMsgSender(isSenderUser(uid, msgSenderUid))

    const { showMsgDetails } = props

    const msgDate = getDateFromTimestamp(createdAt)
    const timeAgo = msgDate ? <TimeAgo date={msgDate} /> : null;

    return (
        <div className={`msg ${messageSender}`}>
            <div className="msg-container">
                <div className="msg-body"><p>{text}</p></div>
                <div className={`msg-time-details`}>
                    {showMsgDetails ?
                        <>
                            {displayName}
                            {timeAgo}
                            {dateFormat(msgDate, 'h:MM TT')}
                        </>
                        :
                        null
                    }

                </div>
            </div>
            <div className="msg-avatar-holder">
                {showMsgDetails && <img className="msg-avatar" src={photoURL} alt='Sender' />}
            </div>
        </div >
    );
}