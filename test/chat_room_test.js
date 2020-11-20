const { describe } = require('mocha')

let expect = require('chai').expect

describe('CHAT ROOM', () => {

    describe('Message Detail', () => {
        let shouldShowMsgDetails = require('../src/helpers/ChatRoomHelper').shouldShowMsgDetails

        before(() => {
            msgs = [{ text: 'Sample', uid: 1 }, { text: 'Sample', uid: 1 },
            { text: 'Sample', uid: 2 }, { text: 'Sample', uid: 2 },
            { text: 'Sample', uid: 3 }, { text: 'Sample', uid: 3 },]
        })

        it('show message details if single msg', () => {
            expect(shouldShowMsgDetails(msgs.slice(0, 1), 0)).to.be.true
        })

        it('should throw error if msg index is out of bounds', () => {
            expect(() => { shouldShowMsgDetails(msgs, -1) }).to.throw(Error)
            expect(() => { shouldShowMsgDetails(msgs, -1) }).to.throw("Index out of bounds")
            expect(() => { shouldShowMsgDetails(msgs, msgs.length) }).to.throw(Error)
            expect(() => { shouldShowMsgDetails(msgs, msgs.length + 1) }).to.throw(Error)
            expect(() => { shouldShowMsgDetails(msgs, 0) }).to.not.throw(Error)
            expect(() => { shouldShowMsgDetails(msgs, msgs.length - 1) }).to.not.throw(Error)
        })

        it('show message details if last msg', () => {
            expect(shouldShowMsgDetails(msgs, msgs.length - 1)).to.be.true
        })

        it('don\'t show message details if next msg is from same sender', () => {
            expect(shouldShowMsgDetails(msgs, 0)).to.be.false
            expect(shouldShowMsgDetails(msgs, 2)).to.be.false
            expect(shouldShowMsgDetails(msgs, 4)).to.be.false
        })

        it('show message details if next msg is not from same sender', () => {
            expect(shouldShowMsgDetails(msgs, 1)).to.be.true
            expect(shouldShowMsgDetails(msgs, 3)).to.be.true
            expect(shouldShowMsgDetails(msgs, 5)).to.be.true
        })
    })

    describe('Message sent by user', () => {
        let isSenderUser = require('../src/helpers/ChatRoomHelper').isSenderUser

        it('user is the sender of msg', () => {
            expect(isSenderUser(1, 1)).to.be.true
            expect(isSenderUser("userid", "userid")).to.be.true
        })

        it('user is not the sender of the msg', () => {
            expect(isSenderUser(1, 2)).to.be.false
            expect(isSenderUser(1, "2")).to.be.false
            expect(isSenderUser("userId", "msgId")).to.be.false
        })
    })

    describe('Class name for message type', () => {
        let getClassNameForMsgSender = require('../src/helpers/ChatRoomHelper').getClassNameForMsgSender

        it('class name should be sender when msg sent by the user', () => {
            expect(getClassNameForMsgSender(true)).to.be.eql("sender")
        })

        it('class name should be receiver when msg not sent by the user', () => {
            expect(getClassNameForMsgSender(false)).to.be.eql("receiver")
            expect(getClassNameForMsgSender(undefined)).to.be.eql("receiver")
            expect(getClassNameForMsgSender(1)).to.be.eql("receiver")
        })
    })

    describe('Date from timestamp', () => {
        let getDateFromTimestamp = require('../src/helpers/ChatRoomHelper').getDateFromTimestamp

        it('should return null for malformed timestamp', () => {
            expect(getDateFromTimestamp(null)).to.not.be.ok
            expect(getDateFromTimestamp(null)).to.be.null
            expect(getDateFromTimestamp({ nanoseconds: 1000 })).to.be.null
            expect(getDateFromTimestamp({ secs: 1000 })).to.be.null
            expect(getDateFromTimestamp({})).to.be.null
            expect(getDateFromTimestamp({ time: 100 })).to.be.null
            expect(getDateFromTimestamp({ seconds: -100 })).to.be.null
            expect(getDateFromTimestamp({ nanoseconds: -100 })).to.be.null
            expect(getDateFromTimestamp({ seconds: 0 })).to.be.null
        })

        it('should return date from timestamp', () => {
            const seconds = 2020 * 60 * 60
            const nanoseconds = 1997 * 60 * 60
            expect(getDateFromTimestamp({ seconds: seconds })).to.be.eql(new Date(seconds * 1000))
            expect(getDateFromTimestamp({ seconds: seconds, nanoseconds: nanoseconds })).to.be.eql(new Date(seconds * 1000 + nanoseconds / 1000000))
        })
    })
})