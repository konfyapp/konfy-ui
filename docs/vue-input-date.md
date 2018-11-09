---
title: vue-input-date
---

# vue-input-date

![npm](https://img.shields.io/npm/v/@konfy/vue-input-date.svg)


- very versatile date input, supporting date and time
- based on native javascript date features, no dependencies
- works great in mobile
- no date picker attached, but can easily work with one
- customize order, appearance, and separators of every date element
- slots available before every date element
- locale
- possible to force timezone
- Use ← → to move between date elements, ↑ ↓ to increase or decrease
- Auto-complete and auto-correct on typing
- custom validation functions accepted

## Installation

```bash
yarn add @konfy/vue-input-date
```


<vp-holder>
<vue-input-date label="Default date input:"/>
<vue-input-date label="With validator (>= today)" required clear-button format="d/m/y" :validator="(d) => new Date(d).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)"/>
<vue-input-date label="Timezone, Slots for year and hour, clear button" clear-button format="y/MM/d hh:ii a 5 z" hour12><span class="date label" slot="year">📆</span><span class="date label" slot="hour">   🕰</span></vue-input-date>
<vue-input-date label="Russian Locale:" locale="ru-RU" format="y/MMM/d"/>
<vue-input-date label="Force timezone:" clear-button format="y/MM/d 20 hh:ii a 20 z" hour12 tz="Europe/Madrid" />
<vue-input-date label="12H clock:" format="hh:ii a" hour12 />
<vue-input-date label="With weekday:" format="y/MMM/d 📆 WWW"/>
<vue-input-date label="No initial input:" :date="null" />
```html
<vue-input-date label="Default date input:"/>
<vue-input-date label="With validator (>= today)" required clear-button format="m/d/y" :validator="(d) => new Date(d).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)"/>
<vue-input-date label="Timezone, Slots for year and hour, clear button" clear-button format="y/MM/d hh:ii a 5 z" hour12><span slot="year">📆</span><span slot="hour">   🕰</span></vue-input-date>
<vue-input-date label="Russian Locale:" locale="ru-RU" format="y/MMM/d"/>
<vue-input-date label="Force timezone:" clear-button format="y/MM/d 20 hh:ii a 20 z" hour12 tz="Europe/Madrid" />
<vue-input-date label="12H clock:" format="hh:ii a" hour12 />
<vue-input-date label="With weekday:" format="y/MMM/d  📆 WWW"/>
<vue-input-date label="No initial input:" :date="null" />
```
</vp-holder>

## props

| property       | type     | default                       | comment                                                      |
| -------------- | -------- | ----------------------------- | ------------------------------------------------------------ |
| `name`         | String   |                               | name of the input (for serialization etc)                    |
| `label`        | String   |                               | Input label                                                  |
| `required`     | Boolean  |                               | is required                                                  |
| `disabled`     | Boolean  |                               | is disabled                                                  |
| `clearButton`  | Boolean  |                               | should include a clear button                                |
| `tz`           | String   |                               | Force a specific timezone. You can use [IANA time zone database](https://www.iana.org/time-zones) for reference. E.g: `Europe/London`, `America/New_York` |
| `locale`       | String   | `en-EN`                       | For the general form and interpretation of the `locale` argument, see the MDN [Intl page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation). |
| `hour12`       | Boolean  | `false`                       | Should use a 12 hour clock instead of 24.                    |
| `date`         | Date     |                               | Initial date                                                 |
| `validator`    | Function |                               | takes current input value (`Date` object) as an argument. Should return `true` or `false` |
| `format`       | String   | `'y/mm/d 20 hh:ii:ss’`        | Format of date input. You can use date tokens to represent fields. Everything else will be interpreted as separators. if a separator is a number, it will mean spacing in pixels.<br />For full list of date tokens see [table below](#format-prop-date-tokens). |
| `placeholders` | Object   | See `placeholders` prop table | Text placeholders for each field. Key represents field name, value is a placeholder string. <br />See `placeholders` prop table for available and default values. |
| `errors`       | Object   | See `errors` prop table       | Object of error strings. Keys: `invalid`, `required`, `custom`.<br /> See `errors` prop table for available and default values. |

### `format` prop - date tokens

| token | example value | comment                    |
| ----- | ------------- | -------------------------- |
| `y`   | 2019          | Year full                  |
| `yy`  | 19            | Year 2 digits              |
| `m`   | 2             | Month number               |
| `mm`  | 02            | Month 2 digits             |
| `M`   | F             | Month name, first letter   |
| `MM`  | Feb           | Month name abbreviated     |
| `MMM` | February      | Month name full            |
| `d`   | 3             | Day number                 |
| `dd`  | 03            | Day 2 digits               |
| `W`   | M             | Weekday name, first letter |
| `WW`  | Mon           | Weekday name abbreviated   |
| `WWW` | Monday        | Weekday name full          |
| `h`   | 9             | Hour number                |
| `hh`  | 09            | Hour 2 digits              |
| `i`   | 5             | Minute number              |
| `ii`  | 05            | Minute 2 digits            |
| `s`   | 3             | Second number              |
| `ss`  | 03            | Second 2 digits            |
| `a`   | AM            | Meridiem                   |
| `z`   | Europe/Paris  | Timezone                   |

### `placeholders` prop

| key        | default   |
| ---------- | --------- |
| `day`      | `'Day'`   |
| `weekday`  | `null`    |
| `month`    | `'Month'` |
| `year`     | ` 'Year'` |
| `hour`     | `'H'`     |
| `minute`   | `'m'`     |
| `second`   | `'s'`     |
| `am`       | `null`    |
| `timezone` | `null`    |



## data

| property   | type         | comment                               |
| ---------- | ------------ | ------------------------------------- |
| `value`    | Date or null | Current date value                    |
| `valid`    | Boolean      | Is valid                              |
| `selected` | Boolean      | Is input selected                     |
| `input`    | Object       | Object of current input fields values |

## computed

| property   | type | comment                         |
| ---------- | ---- | ------------------------------- |
| `tzOffset` | Int  | timezone offset relative to UTC |

## methods

| method              | args                                | comment                                                      |
| ------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `dateAdd(key, val)` | `key:<String>` <br />`val:<Number>` | Add or subtract a number from date field<br />Add 2 days: `dateAdd('day', 2)` <br />Subtract 1 hour: `dateAdd(‘hour’, -1)` |
| `switchAM(v)`       | `v: <Boolean>`                      | Switch clock to A.M. (`true`) or P.M.(`false`)               |
| `validate()`        | –                                   | Validate                                                     |
| `clear()`           | –                                   | Clear input value                                            |

## events

| event         | payload                | comment                             |
| ------------- | ---------------------- | ----------------------------------- |
| `change`      | value: `Date`          | on value change                     |
| `input:focus` | input name: `String`   | on focus of one of the input fields |
| `input:blur`  | input name: `String`   | on blur of one of the input fields  |
| `selected`    | is selected: `Boolean` | whether the component is selected   |
| `error`       | error type: `String`   | on Error                            |
| `valid`       | is valid: `Boolean`    | on Valid status changed             |

## css variables

```css
{
 	--vue-input-error-color: red;
	--vue-input-text-color: black;
	--vue-input-select-color: blue;
	--vue-input-blur-color: rgba(black, .8);
	--vue-input-font-family: system-ui, sans-serif;
	--vue-input-label-font-family: system-ui, sans-serif;
	--vue-input-background-color: transparent;
	--vue-input-hover-background-color: rgba(black, .05);
	--vue-input-focus-background-color: rgba(black, .1);
	--vue-input-border-color:  rgba(black, .5);
	--vue-input-border-color-active: var(--vue-input-select-color);
	--vue-input-border-color-error: var(--vue-input-error-color);
}
```

