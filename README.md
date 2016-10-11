# sf-preferences
> Easily manage SimpliField preferences.

[![NPM version](https://badge.fury.io/js/sf-preferences.svg)](https://npmjs.org/package/sf-preferences) [![Build status](https://secure.travis-ci.org/SimpliField/sf-preferences.svg)](https://travis-ci.org/SimpliField/sf-preferences) [![Dependency Status](https://david-dm.org/SimpliField/sf-preferences.svg)](https://david-dm.org/SimpliField/sf-preferences) [![devDependency Status](https://david-dm.org/SimpliField/sf-preferences/dev-status.svg)](https://david-dm.org/SimpliField/sf-preferences#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/SimpliField/sf-preferences/badge.svg?branch=master)](https://coveralls.io/r/SimpliField/sf-preferences?branch=master) [![Code Climate](https://codeclimate.com/github/SimpliField/sf-preferences.svg)](https://codeclimate.com/github/SimpliField/sf-preferences)

## API
<dl>
<dt><a href="#module_sf-preferences">sf-preferences</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#query">query(name, fallbackValue, ...preferences)</a> ⇒ <code>String</code> | <code>Boolean</code> | <code>Number</code></dt>
<dd><p>Query several preferences sets for a given name</p>
</dd>
<dt><a href="#get">get(preferences, name)</a> ⇒ <code>String</code> | <code>Boolean</code> | <code>Number</code></dt>
<dd><p>Get the value for a preference name in the given preferences set</p>
</dd>
<dt><a href="#set">set(preferences, name, value)</a> ⇒ <code>Array</code></dt>
<dd><p>Set the preference name to the given value in the given preferences set</p>
</dd>
</dl>

<a name="module_sf-preferences"></a>
## sf-preferences
<a name="query"></a>
## query(name, fallbackValue, ...preferences) ⇒ <code>String</code> &#124; <code>Boolean</code> &#124; <code>Number</code>
Query several preferences sets for a given name

**Kind**: global function  
**Returns**: <code>String</code> &#124; <code>Boolean</code> &#124; <code>Number</code> - The resolved value  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The preference name to query for. |
| fallbackValue | <code>String</code> &#124; <code>Boolean</code> &#124; <code>Number</code> | The default value to fallback to. |
| ...preferences | <code>Array</code> | The preferences set in wich to look for |

<a name="get"></a>
## get(preferences, name) ⇒ <code>String</code> &#124; <code>Boolean</code> &#124; <code>Number</code>
Get the value for a preference name in the given preferences set

**Kind**: global function  
**Returns**: <code>String</code> &#124; <code>Boolean</code> &#124; <code>Number</code> - The value to set to.  

| Param | Type | Description |
| --- | --- | --- |
| preferences | <code>Array</code> | The preferences set to search in |
| name | <code>String</code> | The preference name. |

<a name="set"></a>
## set(preferences, name, value) ⇒ <code>Array</code>
Set the preference name to the given value in the given preferences set

**Kind**: global function  
**Returns**: <code>Array</code> - The modified preferences set  

| Param | Type | Description |
| --- | --- | --- |
| preferences | <code>Array</code> | The preferences set to modify |
| name | <code>String</code> | The preference name to set. |
| value | <code>String</code> &#124; <code>Boolean</code> &#124; <code>Number</code> | The value to set to. |

