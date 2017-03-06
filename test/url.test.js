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

describe('URL', function () {
  describe('Node', function () {
    var file = require.resolve('../src')

    describe('Native', function () {
      var URL = require(file)
      delete require.cache[file]
      runTests(URL)
    })

    describe('Shim', function () {
      var originalURL = require('url').URL
      delete require('url').URL
      var URL = require(file)
      require('url').URL = originalURL
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
