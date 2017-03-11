'use strict'

var url = require('url')
var parts = require('./parts')

/**
 * Creates a moch URL function using nodes native url parser.
 * @param {String} path - the path to parse.
 * @param {String} [base] - the base for the url.
 */
var URL = function URL (path, base) {
  if (base) path = url.resolve(base, path)
  var parsed = url.parse(path)
  if (parsed.search === '?') parsed.search = ''
  for (var i = parts.length, part; i--;) {
    part = parts[i]
    this[part] = parsed[part]
  }
}

/**
 * Get the href for the url.
 * @return {String} the href for the url.
 */
URL.prototype.toString = function toString () {
  return this.href
}

// Expose parser.
module.exports = URL
