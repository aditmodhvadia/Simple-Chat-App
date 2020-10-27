import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SendMessage } from '../components/SendMessage';
import TimeAgo from 'react-timeago';
import dateFormat from 'dateformat';

function ChatScreen() {
  const chatMessagesRef = firebase.firestore().collection('chatmessages');
  const query = chatMessagesRef.orderBy('createdAt').limit(50);

  const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <div>
      {messages &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      <section>
        <SendMessage />
      </section>
    </div>
  );
}

function ChatMessage(props) {
  const { text, photoURL, createdAt } = props.message;
  const msgDate = createdAt
    ? new Date((createdAt.seconds - 4) * 1000 + createdAt.nanoseconds / 1000000)
    : null;
  const timeAgo = msgDate ? <TimeAgo date={msgDate} /> : null;

  return (
    <div>
      <p> {text}</p>
      <img src={photoURL} alt='Sender' height='30' width='30' />
      <br />
      {timeAgo}
      <div>{dateFormat(msgDate, 'h:MM TT')}</div>
    </div>
  );
}

export default ChatScreen;
