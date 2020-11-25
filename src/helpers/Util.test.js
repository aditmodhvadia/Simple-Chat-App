describe('Utility test', () => {
    let isValidString = require('./Util').isValidString
    it('should check for valid string', () => {
        expect(isValidString("abcd")).toBe(true);
        expect(isValidString(" asd asd")).toBe(true);
        expect(isValidString("Hello, I am a test.")).toBe(true);
    })

    it('should check for invalid string', () => {
        expect(isValidString("")).toBe(false);
        expect(isValidString(" ")).toBe(false);
        expect(isValidString(null)).toBe(false);
        expect(isValidString(undefined)).toBe(false);
    })
})