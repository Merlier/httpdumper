const http = require('http');
const argv = require('minimist')(process.argv.slice(2));
const httpDumper = require('../httpdumper');

const port = argv.port || 3000;
const host = argv.host || null;
const uploadDir = argv.uploadDir || null;

const server = http.createServer();

if (host) {
    const {proxy, close} = require('fast-proxy')({
        base: host
    });
} else {
    const proxy = null;
    const close = null;
}

server.on('request', function (req, res) {
    httpDumper(req, res, host, proxy, close, uploadDir);
});

server.listen(port, () => {
    console.log(`HttpDump listening at http://localhost:${port}`)
});
