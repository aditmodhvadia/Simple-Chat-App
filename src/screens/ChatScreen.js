import React, { useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SendMessage } from '../components/SendMessage';
import TimeAgo from 'react-timeago';
import dateFormat from 'dateformat';
import { Container, createStyles, Grid, makeStyles } from '@material-ui/core';
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
                {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={scrollTo}></div>
            </section>
            <SendMessage />
        </main>
    );
}

const useStyles = makeStyles((theme) => createStyles({
    circleAvatar: {
        borderRadius: '50%',
        height: '30px',
        width: '30px'
    },
    msgBody: {

    },
    msgTime: {
        fontSize: 14
    },
}));

function ChatMessage(props) {
    const [user] = useAuthState(firebase.auth())
    const { uid } = user
    const { text, photoURL, createdAt } = props.message;

    const messageSender = uid === props.message.uid ? "sender" : "receiver"

    const msgDate = createdAt
        ? new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000)
        : null;
    const timeAgo = msgDate ? <TimeAgo date={msgDate} /> : null;



    const classes = useStyles();

    return (
        <div className={`msg ${messageSender}`}>
            <div className="msg-container">
                <div className="msg-body"><p>{text}</p></div>
                <div className={`msg-time-details`}>
                    {timeAgo}
                    {dateFormat(msgDate, 'h:MM TT')}
                </div>
            </div>
            <div className="msg-avatar">
                <img className={classes.circleAvatar} src={photoURL} alt='Sender' />
            </div>
        </div >
    );
}

export default ChatScreen;
