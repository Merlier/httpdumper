const chalk = require('chalk');
const formidable = require('formidable');

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

const httpDumper = (req, res, proxy = null, close = null, host = null, uploadDir = null) => {
    httpDump(req);

    const body = [];
    const form = formidable({
        multiples: true,
        uploadDir: uploadDir || undefined,
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
}

module.exports = httpDumper;
