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

// Expose stringify.
exports.stringify = stringify

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
    result = new URL(path, base)

    // Make each part default to empty string for consistency.
    for (var i = parts.length, part; i--;) {
      part = parts[i]
      result[part] = result[part] || ''
    }

    // Freeze object to maintain cache.
    result = cache[key] = Object.freeze(result)
  }
  return result
}

/**
 * Convertes a parsed url object into a string.
 * @param  {Object} parsed - the parsed url to convert to a string.
 * @return {String}
 */
function stringify (parsed) {
  if (typeof parsed !== 'object' || parsed == null) throw new TypeError('URL must be an object.')
  return (
    (parsed.protocol ? parsed.protocol + '//' : '') +
    (parsed.host || (parsed.hostname || '') + (parsed.port ? ':' + parsed.port : '')) +
    (parsed.pathname || '') +
    (parsed.search || '') +
    (parsed.hash || '')
  )
}
