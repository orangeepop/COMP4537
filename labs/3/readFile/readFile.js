let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
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
).listen(8080);