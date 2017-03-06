'use strict'

var URL = require('./src')
var parts = require('./src/parts')
var seperator = '~#~'
var cache = {}

// Expose parts for libraries built on top of this.
exports.parts = parts

// Expose cache for clearing.
exports.cache = cache

// Expose parser.
exports.parse = parse

/**
 * Exposes the url parsers and caches results.
 * @param  {String} path - the path for the url.
 * @param  {String} [base] - the base path for the url.
 * @return {URL}
 */
function parse (path, base) {
  var key = path + seperator + base
  var result = cache[key]
  if (!result) {
    // Cache result.
    result = cache[key] = new URL(path, base)

    // Make each part default to empty string for consistency.
    for (var i = parts.length, part; i--;) {
      part = parts[i]
      result[part] = result[part] || ''
    }
  }
  return result
}
