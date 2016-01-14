/* eslint max-nested-callbacks:0 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var assert = require('assert');
var Preferences = require('./index');

describe('Preferences', function () {
  var objects = [{
    preferences: [{
      name: 'plip',
      value: '1.1 plip value'
    }, {
      name: 'plap',
      value: '1.2 plap value'
    }]
  }, {
    preferences: [{
      name: 'plip',
      value: '2.1 plip value'
    }, {
      name: 'plop',
      value: '2.2 plop value'
    }]
  }, {
    preferences: [{
      name: 'foo',
      value: '3.1 foo value'
    }]
  }];

  describe('.query()', function () {

    describe('should fail', function () {

      it('with no pref name', function () {
        assert.throws(Preferences.query);
      });
    });

    describe('should work', function () {

      it('with no object and no fallback', function () {
        assert.equal(_typeof(Preferences.query('plop')), 'undefined');
      });

      it('with no object', function () {
        assert.equal(Preferences.query('plop', 'fallback value'), 'fallback value');
      });

      it('with one object but no match', function () {
        assert.equal(Preferences.query('plop', 'fallback value', objects[0].preferences), 'fallback value');
      });

      it('with one object and a match', function () {
        assert.equal(Preferences.query('plip', 'fallback value', objects[0].preferences), '1.1 plip value');
      });

      it('with several objects and no match', function () {
        assert.equal(Preferences.query.apply(null, ['plup', 'fallback value'].concat(objects.map(function (obj) {
          return obj.preferences;
        }))), 'fallback value');
      });

      it('with several objects and a match for the first', function () {
        assert.equal(Preferences.query.apply(null, ['plip', 'fallback value'].concat(objects.map(function (obj) {
          return obj.preferences;
        }))), '1.1 plip value');
      });

      it('with several objects and a match for the second', function () {
        assert.equal(Preferences.query.apply(null, ['plop', 'fallback value'].concat(objects.map(function (obj) {
          return obj.preferences;
        }))), '2.2 plop value');
      });
    });
  });

  describe('.get()', function () {

    describe('should fail', function () {

      it('with no preferences', function () {
        assert.throws(function () {
          Preferences.get();
        });
      });

      it('with no preference name', function () {
        assert.throws(function () {
          Preferences.get([]);
        });
      });
    });

    describe('should work', function () {

      it('with preferences containing the preference name', function () {
        assert.equal(Preferences.get(objects[0].preferences, 'plip'), '1.1 plip value');
      });

      it('with preferences not containing the preference name', function () {
        assert.equal(_typeof(Preferences.get(objects[0].preferences, 'plop')), 'undefined');
      });
    });
  });

  describe('.set()', function () {

    describe('should fail', function () {

      it('should fail with no preferences', function () {
        assert.throws(function () {
          Preferences.set();
        });
      });

      it('should fail with no preference name', function () {
        assert.throws(function () {
          Preferences.set([]);
        });
      });

      it('should fail with no value', function () {
        assert.throws(function () {
          Preferences.set([], 'name');
        });
      });
    });

    describe('should work', function () {

      it('should work with previously existing property', function () {
        assert.deepEqual(Preferences.set([{
          name: 'plop',
          value: 'kikoolol'
        }], 'plop', 'wadup'), [{
          name: 'plop',
          value: 'wadup'
        }]);
      });

      it('should work with unexisting property', function () {
        assert.deepEqual(Preferences.set([], 'plop', 'wadup'), [{
          name: 'plop',
          value: 'wadup'
        }]);
      });
    });
  });
});