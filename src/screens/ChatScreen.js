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

    // automaticall scroll to the bottom of the msgs when messages are updated
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
        background: theme.palette.primary.main,
        borderRadius: "25px 25px 0px 25px",
        color: "white",
        fontSize: 16
    },
    msgTime: {
        fontSize: 14
    },
}));

function ChatMessage(props) {
    const [user] = useAuthState(firebase.auth())
    const { uid } = user
    const { text, photoURL, createdAt } = props.message;

    const messageSender = uid === props.message.uid ? "sender" : "received"

    const msgDate = createdAt
        ? new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000)
        : null;
    const timeAgo = msgDate ? <TimeAgo date={msgDate} /> : null;



    const classes = useStyles();

    return (
        <Grid className={`${messageSender}`} container spacing={2}>
            <Grid item xs={6} className={classes.msgBody}>
                <Container>
                    <p>{text}</p>
                </Container>
            </Grid>
            <Grid item xs={3} className={classes.msgTime}>
                {timeAgo}
                <div>{dateFormat(msgDate, 'h:MM TT')}</div>
            </Grid>
            <Grid item xs={4} >
                <img className={classes.circleAvatar} src={photoURL} alt='Sender' />
            </Grid>
        </Grid>
    );
}

export default ChatScreen;
