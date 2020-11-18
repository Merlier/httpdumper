const http = require('http');
const argv = require('minimist')(process.argv.slice(2));
const fastProxy = require('fast-proxy');

const httpDumper = require('../httpdumper');

const port = argv.port || 3000;
const host = argv.host || null;
const uploadDir = argv.uploadDir || null;

const server = http.createServer();

const fastProxyHost = host ? fastProxy({
  base: host,
}) : null;
const proxy = fastProxyHost.proxy || null;

server.on('request', (req, res) => {
  httpDumper(req, res, proxy, host, uploadDir);
});

server.listen(port, () => {
  console.log(`HttpDump listening at http://localhost:${port}`); // eslint-disable-line no-console
});
