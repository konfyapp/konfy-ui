---
title: vue-input-date
version: 1.0.0
---

# vue-input-date
<Badge :text="$page.frontmatter.version"/>

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

<vp-holder>
<vue-input-date-2 label="Date 2" format="y/MM/d 20 hh:ii:ss 20 a" hour12/>
<vue-input-date label="Date:"/>
<vue-input-date label="With validator (>= today)" required clear-button :fields="{month: 'numeric', day: 'numeric', year: 'numeric'}" :separators="{month: '/', day: '/'}" :validator="(d) => new Date(d).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)"/>
<vue-input-date label="Timezone, Slots for year and hour, clear button" clear-button :fields="{ year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', am: true, timezone: true }" :separators="{ month: '/', day: '/', hour: null, minute: ':', am: 5 }"><span class="date label" slot="year">📆</span><span class="date label" slot="hour">   🕰</span></vue-input-date>
<vue-input-date label="Russian Locale:" :fields="{year: 'numeric', month: 'long', day: 'numeric'}" locale="ru-RU" />
<vue-input-date label="Force timezone:" clear-button :fields="{ year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', am: true, timezone: true }" :separators="{ month: '/', day: '/', hour: 30, minute: ':', am: 5 }" tz="Europe/London" />
<vue-input-date label="12H clock:" :fields="{ hour: '2-digit', minute: '2-digit', second: '2-digit', am: true }" :separators="{minute: ':', second: ':'}" hour12 />
<vue-input-date label="With weekday:" :fields="{ weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'}"/>
<vue-input-date label="No initial input:" :fields="{ month: 'numeric', day: 'numeric', year: 'numeric' }" :date="null" />

```html
<vue-input-date label="Date:"/>
<vue-input-date label="With validator (>= today)" required :fields="{month: 'numeric', day: 'numeric', year: 'numeric'}" :separators="{month: '/', day: '/'}" :validator="(d) => new Date(d).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)"/>
<vue-input-date label="Timezone, Slots for year and hour, clear button" clear-button :fields="{ year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', am: true, timezone: true }" :separators="{ month: '/', day: 20, hour: ':', minute: null, timezone: 5 }"><span class="date label" slot="year">📆</span><span class="date label" slot="hour">🕰</span></vue-input-date>
<vue-input-date label="Russian Locale:" :fields="{month: 'long', day: 'numeric', year: 'numeric'}" locale="ru-RU" />
<vue-input-date label="Force timezone:" :fields="{ year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', am: true, timezone: true }" :separators="{ month: '/', hour: ':', minute: null, timezone: 5 }" tz="Europe/London" />
<vue-input-date label="12H clock:" :fields="{ hour: '2-digit', minute: '2-digit', second: '2-digit', am: true }" hour12 />
<vue-input-date label="With weekday:" :fields="{ weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'}" :separators="{ weekday: ',', month: '-', year: null, day: '-'}"/>
<vue-input-date label="No initial input:" :fields="{ month: 'numeric', day: 'numeric', year: 'numeric' }" :date="null" />
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
| validator      | Function |                               | takes current input value (`Date` object) as an argument. Should return `true` or `false` |
| `fields`       | Object   | See `fields` prop table       | Object of date fields that the input should contain. The key represents field name, the value represents field format. E.g: `{day: 'numeric', month: 'long'}`. Order matters.<br />See `fields` prop table for available and default values. |
| `separators`   | Object   | See `separators` prop table   | Object of separator strings for each field. Key represents field name, value is a separator string. Value can also be an Integer – in this case it will represent margin in pixels.<br />See `separators` prop table for available and default values. |
| `placeholders` | Object   | See `placeholders` prop table | Text placeholders for each field. Key represents field name, value is a placeholder string. <br />See `placeholders` prop table for available and default values. |
| `errors`       | Object   | See `errors` prop table       | Object of error strings. Keys: `invalid`, `required`, `custom`.<br /> See `errors` prop table for available and default values. |

### `fields` prop

| key        | possible values                             | default   |
| ---------- | ------------------------------------------- | --------- |
| `day`      | `numeric` `2-digit`                         | `numeric` |
| `weekday`  | `narrow` `short` `long`                     |           |
| `month`    | `numeric` `2-digit` `narrow` `short` `long` | `numeric` |
| `year`     | `numeric` `2-digit`                         | `numeric` |
| `hour`     | `numeric` `2-digit`                         | `2-digit` |
| `minute`   | `numeric` `2-digit`                         | `2-digit` |
| `second`   | `numeric` `2-digit`                         | `2-digit` |
| `am`       | `true`                                      |           |
| `timezone` | `true`                                      |           |

### `separators` prop

| key        | default |
| ---------- | ------- |
| `day`      | `'/'`   |
| `weekday`  | ` ' '`  |
| `month`    | `'/'`   |
| `year`     | ` ' '`  |
| `hour`     | `':'`   |
| `minute`   | `':'`   |
| `second`   | `null`  |
| `am`       | `null`  |
| `timezone` | `10`    |

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

### 

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

