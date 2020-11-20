const shouldShowMsgDetails = (msgs, msgIndex) => {
    if (msgIndex < 0 || msgIndex >= msgs.length) {
        throw new Error("Index out of bounds")
    }
    if (msgIndex === msgs.length - 1) {
        return true
    }
    if (msgs[msgIndex].uid === msgs[msgIndex + 1].uid) {
        return false
    }
    return true
}

const isSenderUser = (userId, msgSenderId) => { return userId === msgSenderId }

const getClassNameForMsgSender = isSenderUser => {
    return isSenderUser === true ? "sender" : "receiver"
}

const getDateFromTimestamp = timestamp => {
    return timestamp && timestamp.seconds && timestamp.seconds > 0
        ? new Date(timestamp.seconds * 1000 + (timestamp.nanoseconds && timestamp.nanoseconds > 0 ? timestamp.nanoseconds : 0) / 1000000)
        : null;
}

const getClassNameForChatRoomType = isChatRoomSelected => {
    return isChatRoomSelected === true ? "chat-room-selected" : "chat-room-not-selected"
}

module.exports = {
    shouldShowMsgDetails,
    isSenderUser,
    getClassNameForMsgSender,
    getDateFromTimestamp,
    getClassNameForChatRoomType
}
