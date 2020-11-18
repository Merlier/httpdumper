const chalk = require('chalk');
const MockReq = require('mock-req');

const httpDumper = require('../httpdumper');

describe('test httpdumper', () => {
  let spy;
  let res;
  let proxy;
  const host = 'http://localhost:9000';
  const strDate = '2020-11-18T15:26:58.624Z';

  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const currentDate = new Date('2020-11-18T15:26:58.624Z');
    // const realDate = Date;
    global.Date = class extends Date {
      constructor(date) {
        super(date);

        return currentDate;
      }
    };

    proxy = jest.fn();
  });

  afterAll(() => {
    spy.mockRestore();
  });

  beforeEach(() => {
    res = {
      headers: null,
      status: null,
      body: null,
      end: jest.fn(),
    };
  });

  afterEach(() => {
    spy.mockClear();
    jest.clearAllMocks();
  });

  it('GET /test-get', (done) => {
    const req = new MockReq({
      method: 'GET',
      url: '/test-get',
      headers: {
        host: 'localhost:3000',
        'user-agent': 'user_agent_test',
        accept: '*/*',
      },
    });

    httpDumper(req, res, proxy, host);

    req.on('end', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, '\n\n');
      expect(console.log).toHaveBeenNthCalledWith(
        2,
        chalk.white.bold('Date:'),
        '\t',
        chalk.bgGray(strDate),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        3,
        chalk.white.bold(req.method),
        chalk.white.bold(req.url),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        4,
        chalk.white.bold('host'),
        chalk.dim(': '),
        chalk.white.bold(req.headers.host),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        5,
        chalk.white.bold('user-agent'),
        chalk.dim(': '),
        chalk.white.bold(req.headers['user-agent']),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        6,
        chalk.white.bold('accept'),
        chalk.dim(': '),
        chalk.white.bold(req.headers.accept),
      );
      expect(proxy).toHaveBeenCalledWith(req, res, req.url, {});

      done();
    });
  });

  it('GET /test-get no host', (done) => {
    const req = new MockReq({
      method: 'GET',
      url: '/test-get',
      headers: {
        host: 'localhost:3000',
        'user-agent': 'user_agent_test',
        accept: '*/*',
      },
    });

    httpDumper(req, res);

    req.on('end', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, '\n\n');
      expect(console.log).toHaveBeenNthCalledWith(
        2,
        chalk.white.bold('Date:'),
        '\t',
        chalk.bgGray(strDate),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        3,
        chalk.white.bold(req.method),
        chalk.white.bold(req.url),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        4,
        chalk.white.bold('host'),
        chalk.dim(': '),
        chalk.white.bold(req.headers.host),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        5,
        chalk.white.bold('user-agent'),
        chalk.dim(': '),
        chalk.white.bold(req.headers['user-agent']),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        6,
        chalk.white.bold('accept'),
        chalk.dim(': '),
        chalk.white.bold(req.headers.accept),
      );
      expect(proxy).not.toHaveBeenCalled();

      done();
    });
  });

  it('POST /test-post', (done) => {
    const req = new MockReq({
      method: 'POST',
      url: '/test-post',
      headers: {
        host: 'localhost:3000',
        'user-agent': 'user_agent_test',
        accept: '*/*',
      },
    });
    const body = { a: 'foo', b: 'bar' };
    req.write(body);
    req.end();

    httpDumper(req, res, proxy, host);

    req.on('end', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, '\n\n');
      expect(console.log).toHaveBeenNthCalledWith(
        2,
        chalk.white.bold('Date:'),
        '\t',
        chalk.bgGray(strDate),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        3,
        chalk.white.bold(req.method),
        chalk.white.bold(req.url),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        4,
        chalk.white.bold('host'),
        chalk.dim(': '),
        chalk.white.bold(req.headers.host),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        5,
        chalk.white.bold('user-agent'),
        chalk.dim(': '),
        chalk.white.bold(req.headers['user-agent']),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        6,
        chalk.white.bold('accept'),
        chalk.dim(': '),
        chalk.white.bold(req.headers.accept),
      );
      expect(console.log).toHaveBeenNthCalledWith(7, '\n');
      expect(console.log).toHaveBeenNthCalledWith(
        8,
        chalk.white.bold(JSON.stringify(body)),
      );
      expect(proxy).toHaveBeenCalledWith(req, res, req.url, {});

      done();
    });
  });

  it('POST /test-post no host', (done) => {
    const req = new MockReq({
      method: 'POST',
      url: '/test-post',
      headers: {
        host: 'localhost:3000',
        'user-agent': 'user_agent_test',
        accept: '*/*',
      },
    });
    const body = { a: 'foo', b: 'bar' };
    req.write(body);
    req.end();

    httpDumper(req, res);

    req.on('end', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, '\n\n');
      expect(console.log).toHaveBeenNthCalledWith(
        2,
        chalk.white.bold('Date:'),
        '\t',
        chalk.bgGray(strDate),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        3,
        chalk.white.bold(req.method),
        chalk.white.bold(req.url),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        4,
        chalk.white.bold('host'),
        chalk.dim(': '),
        chalk.white.bold(req.headers.host),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        5,
        chalk.white.bold('user-agent'),
        chalk.dim(': '),
        chalk.white.bold(req.headers['user-agent']),
      );
      expect(console.log).toHaveBeenNthCalledWith(
        6,
        chalk.white.bold('accept'),
        chalk.dim(': '),
        chalk.white.bold(req.headers.accept),
      );
      expect(console.log).toHaveBeenNthCalledWith(7, '\n');
      expect(console.log).toHaveBeenNthCalledWith(
        8,
        chalk.white.bold(JSON.stringify(body)),
      );
      expect(proxy).not.toHaveBeenCalled();

      expect(res.end).toHaveBeenCalledWith(JSON.stringify(body));

      done();
    });
  });
});
