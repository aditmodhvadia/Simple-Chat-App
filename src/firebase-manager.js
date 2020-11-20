import firebase from 'firebase'

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

const collectionNames = {
    CHAT_ROOMS: "chatRooms",
    MESSAGES: "messages",
}

const collections = {
    CHAT_ROOMS: firebase.firestore().collection(collectionNames.CHAT_ROOMS),
    MESSAGES: (chatRoomId) => collections.CHAT_ROOMS.doc(chatRoomId).collection(collectionNames.MESSAGES)
}