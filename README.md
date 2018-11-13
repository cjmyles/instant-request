# Instant Request

HTTP request utility class, using fetch or node-fetch depending the environment.

## Features

- Request

## Installation

You can install this wrapper by running the following in your project:

```bash
$ npm install instant-request
```

## Usage

**ES Modules**

```javascript
import Request from 'instant-request';
const request = new Request('https://example.com');

const test = async () => {
  const response = await request.get('/records');
};
```

**CommonJS Modules**

```javascript
const { Request } = require('instant-request');

const test = async () => {
  const response = await request.get('/records');
};
```

## Running Tests

To run the tests, clone the repository and install the dependencies:

```bash
git clone https://github.com/JSJInvestments/instant-request.git
cd instant-request && npm i
npm run test
```

## License

[MIT](LICENSE)
