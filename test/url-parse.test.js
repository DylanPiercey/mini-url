'use strict'

var assert = require('assert')
var EXAMPLES = {
  'http://user:pass@host.com:8080/p/a/t/h?query=string#hash': {
    protocol: 'http:',
    host: 'host.com:8080',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    pathname: '/p/a/t/h',
    href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
  }
}

describe('Parse', function () {
  describe('Node', function () {
    var file = require.resolve('../src')

    describe('Shim', function () {
      var URL = require(file)
      delete require.cache[file]
      runTests(URL)
    })
  })

  describe('Browser', function () {
    var file = require.resolve('../src/browser')
    describe('Native', function () {
      require('global').URL = require('url').URL
      var URL = require(file)
      delete require.cache[file]
      delete require('global').URL
      runTests(URL)
    })

    describe('Shim', function () {
      var cleanup = require('jsdom-global')()
      delete require('global').URL
      var URL = require(file)
      delete require.cache[file]
      cleanup()
      runTests(URL)
    })
  })

  describe('Cached', function () {
    it('should be immutable', function () {
      var parse = require('../').parse
      var parsed = parse('http://google.ca')
      assert.throws(function () {
        parsed.test = 1
      }, TypeError)
    })
  })
})

/**
 * Runs tests for all of the urls at the top.
 * @param  {Function} URL - the current url parser being tested.
 */
function runTests (URL) {
  Object
    .keys(EXAMPLES)
    .forEach(function testURL (href) {
      it(href, function () {
        var actual = new URL(href)
        var expected = EXAMPLES[href]
        for (var key in expected) {
          assert.equal(actual[key], decodeURIComponent(expected[key]), key + ' should match')
        }
      })
    })
}
