let http = require('http');
let url = require('url');
let utils = require('./modules/utils');

http.createServer((req, res) => {
    const q = url.parse(req.url, true);

    if (q.pathname === "/COMP4537/labs/3/getDate/") {
        utils.handleGetDate(res, q);
    } else if (q.pathname === "/COMP4537/labs/3/writeFile/") {
        utils.handleWrite(res, q);
    } else if (q.pathname === "/COMP4537/labs/3/readFile/text.txt") {
        utils.handleRead(res);
    } else {
        utils.handleBadRequest(res)
    }
}).listen(8080);