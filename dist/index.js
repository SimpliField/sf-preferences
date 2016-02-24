'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _yerror = require('yerror');

var _yerror2 = _interopRequireDefault(_yerror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Preferences = {
  query: preferencesQuery,
  get: preferencesGet,
  set: preferencesSet
};

/**
 * @module sf-preferences
 */
module.exports = Preferences;

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
    throw new _yerror2.default('E_BAD_PREF_NAME', name, typeof name === 'undefined' ? 'undefined' : _typeof(name));
  }

  for (var _len = arguments.length, preferences = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    preferences[_key - 2] = arguments[_key];
  }

  value = preferences.reduce(function (val, prefs) {
    return 'undefined' !== typeof val ? val : prefs ? Preferences.get(prefs, name) : val;
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
    throw new _yerror2.default('E_BAD_PREF_NAME', name, typeof name === 'undefined' ? 'undefined' : _typeof(name));
  }

  var res = preferences.filter(function (pref) {
    return pref.name === name;
  });
  return 'undefined' !== typeof res ? res.value : {}.undef;
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
    throw new _yerror2.default('E_BAD_PREF_NAME', name, typeof name === 'undefined' ? 'undefined' : _typeof(name));
  }
  if ('undefined' === typeof value) {
    throw new _yerror2.default('E_BAD_PREF_VALUE', value, typeof value === 'undefined' ? 'undefined' : _typeof(value));
  }
  preferences.forEach(function (preference) {
    if (preference.name === name) {
      preference.value = value;
      keyNotFound = false;
    }
  });
  if (keyNotFound) {
    preferences.push({ name: name, value: value });
  }
  return preferences;
}
