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

const getClassNameForMsgSender = (isSenderUser) => {
    return isSenderUser === true ? "sender" : "receiver"
}

module.exports = {
    shouldShowMsgDetails,
    isSenderUser,
    getClassNameForMsgSender
}
