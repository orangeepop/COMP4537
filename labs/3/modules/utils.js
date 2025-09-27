const fs = require("fs");

function handleWrite(res, q) {
    const filename = "text.txt";
    let text = q.query.text ? "\n" + q.query.text : "";
    if (text) {
        fs.appendFile(filename, text, function(err) {
            if (err) throw err;
        });
    }

    res.end();
}

function handleRead(res, q) {
    let path = "." + q.pathname;
    fs.readFile(path, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html'});
            return res.end(path + " 404 Not Found!");
        }

        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}

function getDate() {
    return new Date();
}

module.exports = { getDate, handleWrite, handleRead };