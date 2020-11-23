# httpdumper

> **httpdumper** is a library that will help you debugging your http request. 

[![BuildStatus](https://github.com/Merlier/httpdumper/workflows/test/badge.svg)](https://github.com/Merlier/httpdumper/actions?query=workflow%3Atest)
[![Statements](https://raw.githubusercontent.com/Merlier/httpdumper/main/coverage/badge-statements.svg)](https://github.com/Merlier/httpdumper/actions?query=workflow%3Atest)
[![Branches](https://raw.githubusercontent.com/Merlier/httpdumper/main/coverage/badge-branches.svg)](https://github.com/Merlier/httpdumper/actions?query=workflow%3Atest) 
[![Functions](https://raw.githubusercontent.com/Merlier/httpdumper/main/coverage/badge-functions.svg)](https://github.com/Merlier/httpdumper/actions?query=workflow%3Atest) 
[![Lines](https://raw.githubusercontent.com/Merlier/httpdumper/main/coverage/badge-lines.svg)](https://github.com/Merlier/httpdumper/actions?query=workflow%3Atest)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/merlier/httpdumper/blob/main/LICENSE)

[screen](https://raw.githubusercontent.com/Merlier/httpdumper/main/coverage/badge-statements.svg)

## Requirements

* Node >= 0.11.

## Install

```bash
$ npm i -g httpdumper
```

```bash
$ git clone
$ npm i
```

## Usage

```bash
$ httpdumper --port="3000" --host="http://localhost:9000" --uplaodDir="./uploads/"
```

```bash
$ npx httpdumper --port="3000" --host="http://localhost:9000" --uplaodDir="./uploads/"
```

To use from the project sources:
```bash
$ npm start -- --port="3000" --host="http://localhost:9000" --uplaodDir="./uploads/"
```

### Options

```
Usage
  $ httpdumper <options>

Options
  --port          Port which httpdumper will listen to get the request (optional - default: port 3000)
  --host          Host to forward the requests (optional - if not defined, it will return the body request)
  --uplaodDir     Host to forward the requests (optional - default : os.tmpdir())

Examples
  $ httpdumper
  $ httpdumper --port="3000" --host="http://localhost:9000" --uplaodDir="./uploads/"    # Check another path.
```

## License

[MIT](https://github.com/merlier/httpdumper/blob/main/LICENSE)
