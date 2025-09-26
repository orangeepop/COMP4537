let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    const filename = "text.txt";

    let text = q.query.text ? "\n" + q.query.text : "";

    if (text) {
        fs.appendFile(filename, text, function(err) {
            if (err) throw err;
        });
    }

    res.end();
}
).listen(8080);