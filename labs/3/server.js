let http = require('http');
let url = require('url');
let utils = require('./modules/utils');
let greeting = require('./lang/en/en');

// http.createServer(function (req, res) {
//     let q = url.parse(req.url, true);


// }
// ).listen(8080);


http.createServer((req, res) => {
    const q = url.parse(req.url, true);

    if (q.pathname = "/COMP4537/labs/3/getDate/") {
        let name = q.query.name;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<div style="color: blue">${greeting.getString(name)} ${utils.getDate()}</div>`);
        res.end();
    } else if (q.pathname === "/COMP4537/labs/3/writeFile/") {
        utils.handleWrite(res, q);
    } else if (q.pathname === "/COMP4537/labs/3/readFile/") {
        utils.handleRead(res, q);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
    }
}).listen(8080);