'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint max-nested-callbacks:0 */

var _assert = require('assert');

var _index = require('./index');

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
        (0, _assert.equal)(_index.query.apply(null, data), 'fallback value');
      });

      it('with several objects and a match for the first', function () {
        var data = ['plip', 'fallback value'].concat(fakeData.map(function (obj) {
          return obj.preferences;
        }));
        (0, _assert.equal)(_index.query.apply(null, data), '1.1 plip value');
      });

      it('with several objects and a match for the second', function () {
        var data = ['plop', 'fallback value'].concat(fakeData.map(function (obj) {
          return obj.preferences;
        }));
        (0, _assert.equal)(_index.query.apply(null, data), '2.2 plop value');
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