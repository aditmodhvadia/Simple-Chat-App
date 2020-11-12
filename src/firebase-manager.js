import firebase from 'firebase'

/**
 * Get the query for all Chat Rooms
 */
export const getChatRoomListQuery = () => {
    const chatRoomsRef = firebase.firestore().collection("chatRooms");

    const query = chatRoomsRef.orderBy('createdAt');
    return query
}

/**
 * Get all messaged for the given chat room id
 * @param {*ChatRoomId} chatRoomId 
 */
export const getChatRoomMessagesQuery = chatRoomId => {
    const chatMessagesRef = firebase.firestore().collection("chatRooms").doc(chatRoomId).collection("messages");

    const query = chatMessagesRef.orderBy('createdAt', "desc").limit(50);
    return query
}