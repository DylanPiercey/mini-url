<h1 align="center">
  <!-- Logo -->
  <br/>
  mini-url
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/mini-url">
    <img src="https://img.shields.io/npm/v/mini-url.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/mini-url">
    <img src="https://img.shields.io/npm/dm/mini-url.svg?style=flat-square" alt="Downloads"/>
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

* Use `npm test` to run tests.

Please feel free to create a PR!
