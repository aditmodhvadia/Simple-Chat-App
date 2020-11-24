let expect = require('chai').expect


describe('Utility test', () => {
    let isValidString = require('../src/helpers/Util').isValidString
    it('should check for valid string', () => {
        expect(isValidString("abcd")).to.be.true;
        expect(isValidString(" asd asd")).to.be.true;
        expect(isValidString("Hello, I am a test.")).to.be.true;
    })

    it('should check for invalid string', () => {
        expect(isValidString("")).to.be.false;
        expect(isValidString(" ")).to.be.false;
        expect(isValidString(null)).to.be.false;
        expect(isValidString(undefined)).to.be.false;
    })
})