const fs = require("fs");
const lang = require("../lang/en/en.js");
const filename = "text.txt";

function handleWrite(res, q) {
    let text = q.query.text ? "\n" + q.query.text : "";
    if (text) {
        fs.appendFile(filename, text, function(err) {
            if (err) throw err;
        });
    }

    res.end();
}

function handleRead(res) {
    let path = "./" + filename;
    fs.readFile(path, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html'});
            return res.end(path + lang.notFound());
        }

        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}

function handleGetDate(res, q) {
    let name = q.query.name;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<div style="color: blue">${lang.getString(name)} ${getDate()}</div>`);
    res.end();
}

function handleBadRequest(res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(lang.notFound());
}

function getDate() {
    return new Date();
}

module.exports = { handleWrite, handleRead, handleGetDate, handleBadRequest };