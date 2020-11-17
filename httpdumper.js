const http = require('http');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const formidable = require('formidable');

const port = argv.port || 3000;
const host = argv.host || null;

const server = http.createServer();
const {proxy, close} = require('fast-proxy')({
    base: host
});

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

const httpDump = function (req) {
    console.log('\n\n');
    console.log(chalk.white.bold('Date:'), '\t', chalk.bgGray(new Date().toISOString()));

    urlDump(req)
    headerDump(req);
};

server.on('request', function (req, res) {
    httpDump(req);

    const body = [];
    const form = formidable({
        multiples: true,
        uploadDir: './uploads',
        keepExtensions: true
    });
    form.parse(req, (err, fields, files) => {
    });

    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        console.log('\n');
        console.log(chalk.white.bold(body));
        const bufferBody = Buffer.concat(body).toString();

        if (!host) {
            res.end(bufferBody);
        }
    });

    if (host) {
        proxy(req, res, req.url, {});
    }

});

server.listen(port, () => {
    console.log(`HttpDump listening at http://localhost:${port}`)
});
