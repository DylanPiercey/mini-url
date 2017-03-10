'use strict'

var window = require('global')
var vendors = ['ms', 'moz', 'webkit', 'o']
var nativeURL = tryVendors(window, 'URL')

// Try to use native url parser and fall back to <a> parser.
if (nativeURL) {
  module.exports = nativeURL
} else if (window.document) {
  // Load up a fake document to handle url resolution and parsing.
  var getLocation = require('get-loc')
  var parts = require('./parts')
  var doc = window.document.implementation.createHTMLDocument('parser')
  var $base = doc.head.appendChild(doc.createElement('base'))
  var $a = doc.createElement('a')

  /**
   * Creates a moch URL function using a link.
   * @param {[type]} path [description]
   * @param {[type]} base [description]
   */
  var URL = function URL (path, base) {
    $base.href = base || getLocation().href
    $a.href = path

    for (var i = parts.length, part; i--;) {
      part = parts[i]
      this[part] = $a[part] || ''
    }

    // Patch for ie9 which excludes leading slash.
    if (this.pathname[0] !== '/') {
      this.pathname = '/' + this.pathname
    }
  }

  /**
   * Get the href for the url.
   * @return {String} the href for the url.
   */
  URL.prototype.toString = function toString () {
    return this.href
  }

  module.exports = URL
} else {
  throw new Error('URL parser not supported.')
}

/**
 * Check for vendored versions of function
 * @param  {Object} obj - the object to check in.
 * @param  {String} field - the field we are looking for.
 * @return {*|undefined}
 */
function tryVendors (obj, field) {
  if (obj[field]) return obj[field]
  for (var i = vendors.length, alias; i--;) {
    alias = obj[vendors[i] + field]
    if (alias) return alias
  }
}
