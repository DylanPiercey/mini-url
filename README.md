<h1 align="center">
  <!-- Logo -->
  <br/>
  Mini-URL
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg" alt="API Stability"/>
  </a>
  <!-- TypeScript -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- Prettier -->
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with prettier"/>
  </a>
  <!-- Travis build -->
  <a href="https://travis-ci.org/DylanPiercey/mini-url">
  <img src="https://img.shields.io/travis/DylanPiercey/mini-url.svg" alt="Build status"/>
  </a>
  <!-- Coveralls coverage -->
  <a href="https://coveralls.io/github/DylanPiercey/mini-url">
    <img src="https://img.shields.io/coveralls/DylanPiercey/mini-url.svg" alt="Test Coverage"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/mini-url">
    <img src="https://img.shields.io/npm/v/mini-url.svg" alt="NPM Version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/mini-url">
    <img src="https://img.shields.io/npm/dm/mini-url.svg" alt="Downloads"/>
  </a>
  <!-- Size -->
  <a href="https://npmjs.org/package/mini-url">
    <img src="https://img.shields.io/badge/size-1.21kb-green.svg" alt="Browser Bundle Size"/>
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
