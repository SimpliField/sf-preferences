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
  var res = preferences.find(function (pref) {
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
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint max-nested-callbacks:0 */

var _assert = require('assert');

var _index = require('./index');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

describe('Preferences', function () {
  var fakeData = [{
    preferences: [{ name: 'plip', value: '1.1 plip value' }, { name: 'plap', value: '1.2 plap value' }]
  }, {
    preferences: [{ name: 'plip', value: '2.1 plip value' }, { name: 'plop', value: '2.2 plop value' }]
  }, {
    preferences: [{ name: 'foo', value: '3.1 foo value' }]
  }];

  describe('.query(name, fallbackValue)', function () {
    describe('should fail', function () {
      it('with no pref name', function () {
        return (0, _assert.throws)(_index.query, /E_BAD_PREF_NAME/);
      });

      it('with empty string pref name', function () {
        return (0, _assert.throws)(function () {
          return (0, _index.query)('');
        }, /E_BAD_PREF_NAME/);
      });
    });

    describe('should work', function () {
      it('with no object and no fallback', function () {
        return (0, _assert.equal)(_typeof((0, _index.query)('plop')), 'undefined');
      });

      it('with no object', function () {
        return (0, _assert.equal)((0, _index.query)('plop', 'fallback value'), 'fallback value');
      });

      it('with one object but no match', function () {
        return (0, _assert.equal)((0, _index.query)('plop', 'fallback value', fakeData[0].preferences), 'fallback value');
      });

      it('with one object and a match', function () {
        return (0, _assert.equal)((0, _index.query)('plip', 'fallback value', fakeData[0].preferences), '1.1 plip value');
      });

      it('with several objects and no match', function () {
        var data = ['plup', 'fallback value'].concat(fakeData.map(function (obj) {
          return obj.preferences;
        }));
        (0, _assert.equal)(_index.query.apply(undefined, _toConsumableArray(data)), 'fallback value');
      });

      it('with several objects and a match for the first', function () {
        var data = ['plip', 'fallback value'].concat(fakeData.map(function (obj) {
          return obj.preferences;
        }));
        (0, _assert.equal)(_index.query.apply(undefined, _toConsumableArray(data)), '1.1 plip value');
      });

      it('with several objects and a match for the second', function () {
        var data = ['plop', 'fallback value'].concat(fakeData.map(function (obj) {
          return obj.preferences;
        }));
        (0, _assert.equal)(_index.query.apply(undefined, _toConsumableArray(data)), '2.2 plop value');
      });
    });
  });

  describe('.get(preferences, name)', function () {
    describe('should fail', function () {
      it('with no preferences', function () {
        return (0, _assert.throws)(_index.get, /E_BAD_PREF_NAME/);
      });

      it('with no preference name', function () {
        return (0, _assert.throws)(function () {
          return (0, _index.get)([]);
        }, /E_BAD_PREF_NAME/);
      });
    });

    describe('should work', function () {
      it('with preferences containing the preference name', function () {
        return (0, _assert.equal)((0, _index.get)(fakeData[0].preferences, 'plip'), '1.1 plip value');
      });

      it('with preferences not containing the preference name', function () {
        return (0, _assert.equal)(_typeof((0, _index.get)(fakeData[0].preferences, 'plop')), 'undefined');
      });
    });
  });

  describe('.set(preferences, name, value)', function () {
    describe('should fail', function () {
      it('should fail with no preferences', function () {
        return (0, _assert.throws)(function () {
          return (0, _index.set)();
        });
      });

      it('should fail with no preference name', function () {
        return (0, _assert.throws)(function () {
          return (0, _index.set)([]);
        }, /E_BAD_PREF_NAME/);
      });

      it('should fail with no value', function () {
        return (0, _assert.throws)(function () {
          return (0, _index.set)([], 'name');
        }, /E_BAD_PREF_VALUE/);
      });
    });

    describe('should work', function () {
      it('should work with previously existing property', function () {
        return (0, _assert.deepEqual)((0, _index.set)([{ name: 'plop', value: 'kikoolol' }], 'plop', 'wadup'), [{ name: 'plop', value: 'wadup' }]);
      });

      it('should work with unexisting property', function () {
        return (0, _assert.deepEqual)((0, _index.set)([], 'plop', 'wadup'), [{ name: 'plop', value: 'wadup' }]);
      });
    });
  });
});
