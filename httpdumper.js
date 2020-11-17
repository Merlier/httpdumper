var http = require('http');
var argv = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');
var httpProxy = require('http-proxy');
const formidable = require('formidable');

var server = http.createServer();
var proxy = httpProxy.createProxyServer({});

const port = argv.port || 3000;
const host = argv.host || null;
const rawBody = argv.rawBody || false;

const urlDump = (req) => {
    console.log(chalk.white.bold(req.method), chalk.white.bold(req.url));
    return req.url;
}

const headerDump = (req) => {
    for (const header in req.headers) {
        console.log(
            chalk.white.bold(header),
            chalk.dim(': '),
            chalk.white.bold(req.headers[header])
        );
    }

    return req.headers;
};

const bodyDump = (req) => {
    let body = [];
    console.log('\n');

    if (rawBody) {
        req.on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            body = Buffer.concat(body).toString();
            console.log(chalk.white.bold(body));
        });
    } else {
        const form = formidable({
            multiples: true ,
            uploadDir: './uploads',
            keepExtensions: true
        });

        form.parse(req, (err, fields, files) => {
            body = {...fields, ...files};
            console.log(chalk.white.bold(JSON.stringify(body)));
        });
    }

    return body;
}

const httpDump = function(req) {
    console.log('\n\n');
    console.log(chalk.white.bold('Date:'), '\t', chalk.bgGray(new Date().toISOString()));

    urlDump(req)
    headerDump(req);
    const body = bodyDump(req);

    return body;
};

server.on('request', function(req, res) {
    const body = httpDump(req);

    if (!host) {
        console.log(chalk.gray.bold('Body:'));
        const bufferBody = Buffer.concat(body).toString();
        res.end(bufferBody);
        return;
    }

    proxy.web(req, res, {
        target: host
    });
});

server.listen(port, () => {
    console.log(`HttpDump listening at http://localhost:${port}`)
});
