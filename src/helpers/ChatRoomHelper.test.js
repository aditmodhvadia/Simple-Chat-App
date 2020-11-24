const { getClassNameForChatRoomType } = require('./ChatRoomHelper')

describe('CHAT ROOM', () => {

    describe('Message Detail', () => {
        let shouldShowMsgDetails = require('./ChatRoomHelper').shouldShowMsgDetails
        let msgs;
        beforeEach(() => {
            msgs = [{ text: 'Sample', uid: 1 }, { text: 'Sample', uid: 1 },
            { text: 'Sample', uid: 2 }, { text: 'Sample', uid: 2 },
            { text: 'Sample', uid: 3 }, { text: 'Sample', uid: 3 },]
        })

        it('show message details if single msg', () => {
            expect(shouldShowMsgDetails(msgs.slice(0, 1), 0)).toBe(true)
        })

        it('should throw error if msg index is out of bounds', () => {
            expect(() => { shouldShowMsgDetails(msgs, -1) }).toThrowError()
            expect(() => { shouldShowMsgDetails(msgs, -1) }).toThrow("Index out of bounds")
            expect(() => { shouldShowMsgDetails(msgs, msgs.length) }).toThrowError()
            expect(() => { shouldShowMsgDetails(msgs, msgs.length + 1) }).toThrowError()
            expect(() => { shouldShowMsgDetails(msgs, 0) }).not.toThrowError()
            expect(() => { shouldShowMsgDetails(msgs, msgs.length - 1) }).not.toThrowError()
        })

        it('show message details if last msg', () => {
            expect(shouldShowMsgDetails(msgs, msgs.length - 1)).toBe(true)
        })

        it('don\'t show message details if next msg is from same sender', () => {
            expect(shouldShowMsgDetails(msgs, 0)).toBeFalsy()
            expect(shouldShowMsgDetails(msgs, 2)).toBeFalsy()
            expect(shouldShowMsgDetails(msgs, 4)).toBeFalsy()
        })

        it('show message details if next msg is not from same sender', () => {
            expect(shouldShowMsgDetails(msgs, 1)).toBe(true)
            expect(shouldShowMsgDetails(msgs, 3)).toBe(true)
            expect(shouldShowMsgDetails(msgs, 5)).toBe(true)
        })
    })

    describe('Message sent by user', () => {
        let isSenderUser = require('./ChatRoomHelper').isSenderUser

        it('user is the sender of msg', () => {
            expect(isSenderUser(1, 1)).toBe(true)
            expect(isSenderUser("userid", "userid")).toBe(true)
        })

        it('user is not the sender of the msg', () => {
            expect(isSenderUser(1, 2)).toBeFalsy()
            expect(isSenderUser(1, "2")).toBeFalsy()
            expect(isSenderUser("userId", "msgId")).toBeFalsy()
        })
    })

    describe('Class name for message type', () => {
        let getClassNameForMsgSender = require('./ChatRoomHelper').getClassNameForMsgSender

        it('class name should be sender when msg sent by the user', () => {
            expect(getClassNameForMsgSender(true)).toStrictEqual("sender")
        })

        it('class name should be receiver when msg not sent by the user', () => {
            expect(getClassNameForMsgSender(false)).toStrictEqual("receiver")
            expect(getClassNameForMsgSender(undefined)).toStrictEqual("receiver")
            expect(getClassNameForMsgSender(1)).toStrictEqual("receiver")
        })
    })

    describe('Date from timestamp', () => {
        let getDateFromTimestamp = require('./ChatRoomHelper').getDateFromTimestamp

        it('should return null for malformed timestamp', () => {
            expect(getDateFromTimestamp(null)).toBeNull()
            expect(getDateFromTimestamp(null)).toBeNull()
            expect(getDateFromTimestamp({ nanoseconds: 1000 })).toBeNull()
            expect(getDateFromTimestamp({ secs: 1000 })).toBeNull()
            expect(getDateFromTimestamp({})).toBeNull()
            expect(getDateFromTimestamp({ time: 100 })).toBeNull()
            expect(getDateFromTimestamp({ seconds: -100 })).toBeNull()
            expect(getDateFromTimestamp({ nanoseconds: -100 })).toBeNull()
            expect(getDateFromTimestamp({ seconds: 0 })).toBeNull()
        })

        it('should return date from timestamp', () => {
            const seconds = 2020 * 60 * 60
            const nanoseconds = 1997 * 60 * 60
            expect(getDateFromTimestamp({ seconds: seconds })).toEqual(new Date(seconds * 1000))
            expect(getDateFromTimestamp({ seconds: seconds, nanoseconds: nanoseconds })).toEqual(new Date(seconds * 1000 + nanoseconds / 1000000))
        })
    })

    describe('Class name for chat room', () => {
        it('should return chat room selected for true', () => {
            expect(getClassNameForChatRoomType(true)).toEqual("chat-room-selected")
        })

        it('should return chat room not selected for exery other value', () => {
            const expectedValue = "chat-room-not-selected"
            expect(getClassNameForChatRoomType(false)).toEqual(expectedValue)
            expect(getClassNameForChatRoomType(null)).toEqual(expectedValue)
            expect(getClassNameForChatRoomType(undefined)).toEqual(expectedValue)
            expect(getClassNameForChatRoomType(1)).toEqual(expectedValue)
            expect(getClassNameForChatRoomType(0)).toEqual(expectedValue)
            expect(getClassNameForChatRoomType("test")).toEqual(expectedValue)
            expect(getClassNameForChatRoomType(100)).toEqual(expectedValue)
        })
    })
})