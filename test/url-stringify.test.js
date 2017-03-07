'use strict'

var assert = require('assert')
var stringify = require('../').stringify
var EXAMPLES = {
  'http://host.com:8080/p/a/t/h?query=string#hash': {
    protocol: 'http:',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    pathname: '/p/a/t/h'
  }
}

describe('Stringify', function () {
  Object
    .keys(EXAMPLES)
    .forEach(function testURL (href) {
      it(href, function () {
        var actual = stringify(EXAMPLES[href])
        var expected = href

        assert.equal(actual, expected)
      })
    })
})
