# Instant Utils

Client/server agnostic http request library.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Instantiation](#instantiation)
  - [Get](#get)
  - [Post](#post)
  - [Put](#put)
  - [Remove](#remove)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install this package using npm:

```bash
$ npm install instant-request
```

## Usage

Here is a quick example to get you started:

**ES Modules**

```javascript
import Request from 'instant-request';
const request = new Request('https://example.com');

const test = async () => {
  const response = await request.get('/api/records'); // => https://example.com/api/records
  const json = await response.json();
  console.log(json);
};
```

**CommonJS Modules**

```javascript
var Request = require('instant-request').Request;
var request = new Request('https://example.com');

request
  .get('/api/records') // => https://example.com/api/records
  .then(function(response) {
    response.json().then(function(json) {
      console.log(json);
    });
  });
```

## API

### Instantiation

Create an instance of the Request class.

#### Arguments

`baseUrl (String)`: Base URL for all future requests.
`options (Object) = {}`: Configuration object

### Returns

`instanceof Request`

#### Example Usage

```js
const request = new Request('https://example.com');
```

### Get

Make an HTTP GET request to the specified URI.

#### Arguments

`uri (String)`: The URI to request, e.g `/api/records`.\
`query (Object)`: The query object to append to the fully qualified URL, e.g `{ active: 1 }` => `https://example.com/api/records?active=1`.

#### Returns

`Response`

#### Example Usage

```js
async function getCountries() {
  // https://example.com/api/countries
  const response = await request.get('/api/countries');
  const json = await response.json();
  return json;
}
```

### Post

Make an HTTP POST request to the specified URI.

#### Arguments

`uri (String)`: The URI to request, e.g `/api/records`.\
`data (Object)`: The data to POST.\
`query (Object)`: The query object to append to the fully qualified URL, e.g `{ active: 1 }` => `https://example.com/api/records?active=1`.

#### Returns

`Response`

#### Example Usage

```js
async function createCountries() {
  // https://example.com/api/countries
  const response = await request.post('/api/countries', {
    id: 1,
    name: 'Australia',
  });
  const json = await response.json();
  return json;
}
```

### Put

Make an HTTP PUT request to the specified URI.

#### Arguments

`uri (String)`: The URI to request, e.g `/api/records`.\
`data (Object)`: The data to PUT.\
`query (Object)`: The query object to append to the fully qualified URL, e.g `{ active: 1 }` => `https://example.com/api/records?active=1`.

#### Returns

`Response`

#### Example Usage

```js
async function updateCountry() {
  // https://example.com/api/countries
  const response = await request.put('/api/countries/1', {
    animal: 'Kangaroo',
  });
  const json = await response.json();
  return json;
}
```

### Delete

Make an HTTP DELETE request to the specified URI.

#### Arguments

`uri (String)`: The URI to request, e.g `/api/records`.\
`query (Object)`: The query object to append to the fully qualified URL, e.g `{ active: 1 }` => `https://example.com/api/records?active=1`.

#### Returns

`Response`

#### Example Usage

```js
async function deleteCountry() {
  // https://example.com/api/countries
  const response = await request.delete('/api/countries/1');
  const json = await response.json();
  return json;
}
```

## Contributing

We'd greatly appreciate any [contribution](CONTRIBUTING.md) you make.

## License

[MIT](LICENSE)
