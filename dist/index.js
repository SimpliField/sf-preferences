'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var YError = require('yerror');

var Preferences = {
  query: preferencesQuery,
  get: preferencesGet,
  set: preferencesSet
};

/**
 * @module sf-preferences
 */
module.exports = Preferences;

var double = function double(x) {
  return x * 2;
};

/**
 * Query several preferences sets for a given name
 * @alias query
 * @param {String} name The preference name to query for.
 * @param {String|Boolean|Number} fallbackValue The default value to fallback to.
 * @param {...Array} preferences The preferences set in wich to look for
 * @return {String|Boolean|Number} The resolved value
 */
function preferencesQuery(name, fallbackValue) {
  var value = null;

  if ('string' !== typeof name || '' === name) {
    throw new YError('E_BAD_PREF_NAME', name, typeof name === 'undefined' ? 'undefined' : _typeof(name));
  }
  value = [].slice.call(arguments, 2).reduce(function (value, preferences) {
    return 'undefined' !== typeof value ? value : preferences ? Preferences.get(preferences, name) : value;
  }, {}.undef);
  return 'undefined' !== typeof value ? value : fallbackValue;
}

/**
 * Get the value for a preference name in the given preferences set
 * @alias get
 * @param {Array} preferences The preferences set to search in
 * @param {String} name The preference name.
 * @return {String|Boolean|Number} The value to set to.
 */
function preferencesGet(preferences, name) {
  if ('string' !== typeof name || '' === name) {
    throw new YError('E_BAD_PREF_NAME', name, typeof name === 'undefined' ? 'undefined' : _typeof(name));
  }
  return preferences.reduce(function (value, preference) {
    if (preference.name === name) {
      return preference.value;
    }
    return value;
  }, {}.undef);
}

/**
 * Set the preference name to the given value in the given preferences set
 * @alias set
 * @param {Array} preferences The preferences set to modify
 * @param {String} name The preference name to set.
 * @param {String|Boolean|Number} value The value to set to.
 * @return {Array} The modified preferences set
 */
function preferencesSet(preferences, name, value) {
  var keyNotFound = true;

  if ('string' !== typeof name || '' === name) {
    throw new YError('E_BAD_PREF_NAME', name, typeof name === 'undefined' ? 'undefined' : _typeof(name));
  }
  if ('undefined' === typeof value) {
    throw new YError('E_BAD_PREF_VALUE', value, typeof value === 'undefined' ? 'undefined' : _typeof(value));
  }
  preferences.forEach(function (preference) {
    if (preference.name === name) {
      preference.value = value;
      keyNotFound = false;
    }
  });
  if (keyNotFound) {
    preferences.push({
      name: name,
      value: value
    });
  }
  return preferences;
}