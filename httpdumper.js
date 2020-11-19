const chalk = require('chalk');
const formidable = require('formidable');

const urlDump = (req) => {
  console.log(chalk.white.bold(req.method), chalk.white.bold(req.url));
  return req.url;
};

const headerDump = (req) => {
  const headerKeys = Object.keys(req.headers);
  headerKeys.forEach((header) => {
    console.log(
      chalk.white.bold(header),
      chalk.dim(': '),
      chalk.white.bold(req.headers[header]),
    );
  });

  return req.headers;
};

const httpDump = (req) => {
  console.log('\n\n');
  console.log(
    chalk.white.bold('Date:'),
    '\t',
    chalk.bgGray(new Date().toISOString()),
  );

  urlDump(req);
  headerDump(req);
};

const httpDumper = (req, res, proxy = null, host = null, uploadDir = null) => {
  httpDump(req);

  const body = [];
  const form = formidable({
    multiples: true,
    uploadDir: uploadDir || undefined,
    keepExtensions: true,
  });
  form.parse(req);

  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
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
};

module.exports = httpDumper;
