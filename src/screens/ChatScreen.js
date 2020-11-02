import React, { useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SendMessage } from '../components/SendMessage';
import TimeAgo from 'react-timeago';
import dateFormat from 'dateformat';
import { useAuthState } from 'react-firebase-hooks/auth';


function ChatScreen() {
    const chatMessagesRef = firebase.firestore().collection('chatmessages');
    const query = chatMessagesRef.orderBy('createdAt').limit(50);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const scrollTo = useRef()

    // automatically scroll to the bottom of the msgs when messages are updated
    useEffect(() => {
        scrollTo.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <main>
            <section>
                {messages && messages.map((msg, i) => {
                    let showMsgDetails = true
                    if (i === messages.length - 1) {
                        showMsgDetails = true
                    }
                    if (i + 1 < messages.length && messages[i + 1].uid === msg.uid) {
                        showMsgDetails = false
                    }
                    return <ChatMessage key={msg.id} message={msg} showMsgDetails={showMsgDetails} />
                }
                )}
                <div ref={scrollTo}></div>
            </section>
            <SendMessage />
        </main>
    );
}

function ChatMessage(props) {
    const [user] = useAuthState(firebase.auth())
    const { uid } = user
    const { text, photoURL, createdAt, displayName } = props.message;

    const messageSender = uid === props.message.uid ? "sender" : "receiver"

    const { showMsgDetails } = props


    const msgDate = createdAt
        ? new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000)
        : null;
    const timeAgo = msgDate ? <TimeAgo date={msgDate} /> : null;




    return (
        <div className={`msg ${messageSender}`}>
            <div className="msg-container">
                <div className="msg-body"><p>{text}</p></div>
                <div className={`msg-time-details`}>
                    {showMsgDetails && displayName}
                    {showMsgDetails && timeAgo}
                    {showMsgDetails && dateFormat(msgDate, 'h:MM TT')}
                </div>
            </div>
            <div className="msg-avatar-holder">
                {showMsgDetails && <img className="msg-avatar" src={photoURL} alt='Sender' />}
            </div>
        </div >
    );
}

export default ChatScreen;
