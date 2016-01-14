/* eslint max-nested-callbacks:0 */

import { equal, throws, deepEqual } from 'assert';
import { get, set, query } from './index';

describe('Preferences', () => {
  var fakeData = [
    {
      preferences: [
        { name: 'plip', value: '1.1 plip value' },
        { name: 'plap', value: '1.2 plap value' },
      ],
    },
    {
      preferences: [
        { name: 'plip', value: '2.1 plip value' },
        { name: 'plop', value: '2.2 plop value' },
      ],
    },
    {
      preferences: [
        { name: 'foo', value: '3.1 foo value' },
      ],
    },
  ];

  describe('.query(name, fallbackValue)', () => {
    describe('should fail', () =>
      it('with no pref name', () => throws(query))
    );

    describe('should work', () => {
      it('with no object and no fallback', () => equal(typeof query('plop'), 'undefined'));

      it('with no object', () => equal(query('plop', 'fallback value'), 'fallback value'));

      it('with one object but no match', () =>
        equal(query('plop', 'fallback value', fakeData[0].preferences), 'fallback value')
      );

      it('with one object and a match', () =>
        equal(query('plip', 'fallback value', fakeData[0].preferences), '1.1 plip value')
      );

      it('with several objects and no match', () => {
        const data = ['plup', 'fallback value']
          .concat(fakeData.map((obj) => obj.preferences));
        equal(query.apply(null, data), 'fallback value');
      });

      it('with several objects and a match for the first', () => {
        const data = ['plip', 'fallback value']
          .concat(fakeData.map((obj) => obj.preferences));
        equal(query.apply(null, data), '1.1 plip value');
      });

      it('with several objects and a match for the second', () => {
        const data = ['plop', 'fallback value']
          .concat(fakeData.map((obj) => obj.preferences));
        equal(query.apply(null, data), '2.2 plop value');
      });
    });
  });

  describe('.get(preferences, name)', () => {
    describe('should fail', () => {
      it('with no preferences', () => throws(get, /E_BAD_PREF_NAME/));

      it('with no preference name', () => throws(() => get([]), /E_BAD_PREF_NAME/));
    });

    describe('should work', () => {
      it('with preferences containing the preference name', () =>
        equal(get(fakeData[0].preferences, 'plip'), '1.1 plip value')
      );

      it('with preferences not containing the preference name', () =>
        equal(typeof get(fakeData[0].preferences, 'plop'), 'undefined')
      );
    });
  });

  describe('.set(preferences, name, value)', () => {
    describe('should fail', () => {
      it('should fail with no preferences', () => throws(() => set()));

      it('should fail with no preference name', () => throws(() => set([]), /E_BAD_PREF_NAME/));

      it('should fail with no value', () => throws(() => set([], 'name'), /E_BAD_PREF_VALUE/));
    });

    describe('should work', () => {
      it('should work with previously existing property', () =>
        deepEqual(
          set([{ name: 'plop', value: 'kikoolol' }], 'plop', 'wadup'),
          [{ name: 'plop', value: 'wadup' }]
        )
      );

      it('should work with unexisting property', () =>
        deepEqual(
          set([], 'plop', 'wadup'),
          [{ name: 'plop', value: 'wadup' }]
        )
      );
    });
  });
});
