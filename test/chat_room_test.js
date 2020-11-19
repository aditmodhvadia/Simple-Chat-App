let expect = require('chai').expect

describe('Message Detail', () => {
    let shouldShowMsgDetails = require('../src/helpers/ChatRoomHelper').shouldShowMsgDetails

    before(() => {
        msgs = [{ text: 'Sample', uid: 1 }, { text: 'Sample', uid: 1 },
        { text: 'Sample', uid: 2 }, { text: 'Sample', uid: 2 },
        { text: 'Sample', uid: 3 }, { text: 'Sample', uid: 3 },]
    })

    it('show message details if single msg', () => {
        // const msgs = [{ text: 'Sample', uid: 1 }]
        expect(shouldShowMsgDetails(msgs.slice(0, 1), 0)).to.be.true
    })

    it('should throw error if msg index is out of bounds', () => {
        // let handler = () => { shouldShowMsgDetails(msgs, -1) }
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

describe('Class name for message', () => {
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