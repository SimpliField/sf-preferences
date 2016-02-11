import YError from 'yerror';

var Preferences = {
  query: preferencesQuery,
  get: preferencesGet,
  set: preferencesSet,
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
function preferencesQuery(name, fallbackValue, ...preferences) {
  let value = null;

  if('string' !== typeof name || '' === name) {
    throw new YError('E_BAD_PREF_NAME', name, typeof name);
  }
  value = preferences.reduce(
    (val, prefs) => 'undefined' !== typeof val ? val :
      prefs ? Preferences.get(prefs, name) : val,
    {}.undef);
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
  if('string' !== typeof name || '' === name) {
    throw new YError('E_BAD_PREF_NAME', name, typeof name);
  }
  const res = preferences.find((pref) => pref.name === name);
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

  if('string' !== typeof name || '' === name) {
    throw new YError('E_BAD_PREF_NAME', name, typeof name);
  }
  if('undefined' === typeof value) {
    throw new YError('E_BAD_PREF_VALUE', value, typeof value);
  }
  preferences.forEach((preference) => {
    if(preference.name === name) {
      preference.value = value;
      keyNotFound = false;
    }
  });
  if(keyNotFound) {
    preferences.push({ name, value });
  }
  return preferences;
}
