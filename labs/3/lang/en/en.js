function getString(name) {
    return `Hello ${name}, what a beautiful day. Server current date and time is`;
}

function notFound() {
    return "404 Not Found"
}

module.exports = { getString, notFound };