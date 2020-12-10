import firebase from 'firebase'
import { isValidString } from './helpers/Util';

/**
 * Get the query for all Chat Rooms
 */
export const getChatRoomListQuery = () => {
    const query = collections.CHAT_ROOMS.orderBy('createdAt');
    return query
}

/**
 * Get all messaged for the given chat room id
 * @param {*ChatRoomId} chatRoomId 
 */
export const getChatRoomMessagesQuery = chatRoomId => {
    const query = collections.MESSAGES(chatRoomId).orderBy('createdAt', "desc").limit(50);
    return query
}

export const createNewChannel = (channelName, uid) => {
    if (!isValidString(channelName)) {
        throw new Error("Invalid channel name.")
    }
    return collections.CHAT_ROOMS.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: channelName,
        createdBy: uid
    })
}

export const sendNewMessage = (chatRoomId, { msg, uid, photoURL, displayName }) => {
    const chatMessagesRef = chatRoomId ? firebase.firestore().collection('chatRooms').doc(chatRoomId).collection("messages") : null
    return chatMessagesRef.add({
        text: msg.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        displayName
    })
}

const collectionNames = {
    CHAT_ROOMS: "chatRooms",
    MESSAGES: "messages",
}

const collections = {
    CHAT_ROOMS: firebase.firestore().collection(collectionNames.CHAT_ROOMS),
    MESSAGES: (chatRoomId) => collections.CHAT_ROOMS.doc(chatRoomId).collection(collectionNames.MESSAGES)
}