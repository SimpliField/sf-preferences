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
  throwStringDataError(name);
  const value = preferences.reduce(getPreference(name), {}.undef);
  return isDefined(value) ? value : fallbackValue;
}

/**
 * Get the value for a preference name in the given preferences set
 * @alias get
 * @param {Array} preferences The preferences set to search in
 * @param {String} name The preference name.
 * @return {String|Boolean|Number} The value to set to.
 */
function preferencesGet(preferences, name) {
  throwStringDataError(name);
  const res = findDataByName(name, preferences);
  return isDefined(res) ? res.value : {}.undef;
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
  throwStringDataError(name);
  throwDefinedDataError(value);
  if(!isDefined(findDataByName(name, preferences))) {
    preferences.push({ name, value });
  } else {
    preferences = preferences.map(setValue(name, value));
  }
  return preferences;
}


const getPreference = (name) => (val, prefs) => {
  return isDefined(val) ?
    val : prefs ?
      Preferences.get(prefs, name) : val;
}
const setValue = (name, value) => (preference) => {
  if(preference.name === name) {
    preference.value = value;
  }
  return preference;
}

const findDataByName = (name, datas) => datas.find(data => data.name === name);
const isDefined = value => 'undefined' !== typeof value;
const isString  = value => 'string' === typeof value;
const throwStringDataError = data => {
  if(!isString(data) || '' === data) {
    throw new YError('E_BAD_PREF_NAME', data, typeof data);
  };
}
const throwDefinedDataError = data => {
  if(!isDefined(data)) {
    throw new YError('E_BAD_PREF_VALUE', data, typeof data);
  };
}
