import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { SendMessage } from '../components/SendMessage'


function ChatScreen() {
    const chatMessagesRef = firebase.firestore().collection('chatmessages')
    const query = chatMessagesRef.orderBy('createdAt').limit(50)

    const [messages] = useCollectionData(query, { idField: 'id' })

    return (
        <div>
            This is the chat screen
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

            <section>
                <SendMessage />
            </section>
        </div>
    )
}

function ChatMessage(props) {
    const { id, text } = props.message
    return (
        <p>
            {text}
        </p>
    )
}

export default ChatScreen
