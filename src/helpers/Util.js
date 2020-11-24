const isValidString = str => {
    if (str && str.trim() !== "") {
        return true
    } else {
        return false
    }
}

module.exports = { isValidString }