let http = require('http');
let url = require('url');
let dt = require('./modules/utils');
let greeting = require('./lang/en/en');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);

    let name = q.query.name;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<div style="color: blue">${greeting.getString(name)} ${dt.getDate()}</div>`);
    res.end();
}
).listen(8080);