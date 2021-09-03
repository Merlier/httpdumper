#!/usr/bin/env node

const https = require('https');
const http = require('http');
const argv = require('minimist')(process.argv.slice(2));
const fastProxy = require('fast-proxy');
const fs = require('fs');

const httpDumper = require('../httpdumper');

const port = argv.port || 3000;
const host = argv.host || null;
const uploadDir = argv.uploadDir || null;

const options = {
  key: fs.readFileSync(__dirname + '/../../ct9HttpServer/ct9.key'),
  cert: fs.readFileSync(__dirname + '/../../ct9HttpServer/ct9.pem'),
};

const server = http.createServer(options);

const fastProxyHost = host
  ? fastProxy({
      base: host,
    })
  : null;
const proxy = fastProxyHost.proxy || null;

server.on('request', (req, res) => {
  httpDumper(req, res, proxy, host, uploadDir);
});

server.listen(port, () => {
  console.log(`HttpDump listening at http://localhost:${port}`); // eslint-disable-line no-console
});
