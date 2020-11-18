let expect = require('chai').expect
let shouldShowMsgDetails = require('../src/helpers/ChatRoomHelper').shouldShowMsgDetails

describe('chat room', () => {
    it('show message details if single msg', () => {
        const msgs = [{ text: 'Sample', uid: 1 }]
        expect(shouldShowMsgDetails(msgs, 0)).to.be.true
    })
    const msgs = [{ text: 'Sample', uid: 1 }, { text: 'Sample', uid: 1 },
    { text: 'Sample', uid: 2 }, { text: 'Sample', uid: 2 },
    { text: 'Sample', uid: 3 }, { text: 'Sample', uid: 3 },]

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