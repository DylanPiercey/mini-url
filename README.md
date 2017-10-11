<h1 align="center">
  <!-- Logo -->
  <br/>
  mini-url
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg" alt="API stability"/>
  </a>
  <!-- TypeScript -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/mini-url">
    <img src="https://img.shields.io/npm/v/mini-url.svg" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/mini-url">
    <img src="https://img.shields.io/npm/dm/mini-url.svg" alt="Downloads"/>
  </a>
</h1>

Light weight, universal, URL parser for node and the browser with built in caching.

# Installation

```console
npm install mini-url
```

# Example

```javascript
import { parse, stringify } from 'mini-url'

// Parse a url into an object.
parse('http://host.com:8080/p/a/t/h?query=string#hash')
/* {
    protocol: 'http:',
    host: 'host.com:8080',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    pathname: '/p/a/t/h',
    href: 'http://host.com:8080/p/a/t/h?query=string#hash'
} */

// Stringify an object into a url string.
stringify({
  protocol: 'http:',
  host: 'host.com:8080',
  hash: '#hash',
  search: '?query=string',
  pathname: '/p/a/t/h'
})
/* http://host.com:8080/p/a/t/h?query=string#hash */
```

### Contributions

* Use `npm test` to build and run tests.

Please feel free to create a PR!
