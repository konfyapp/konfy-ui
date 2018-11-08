---
title: vue-input
---

<style scoped lang='stylus'>
.vp-holder
    max-width 540px
.vue-input.color
    max-width 40px
</style>

# vue-input

![npm](https://img.shields.io/npm/v/@konfy/vue-input.svg)

- A versatile input with optional validation.
`vue-input` can be of all standard html input types (`text` `number` `date`, etc.) 
- `textarea` type with autogrow by default.
- all standard html input attributes are also valid with `vue-input`
- validation on change or on blur
- built-in validation for most common cases (email, length, equality), with possibility to pass custom regex validators

## Installation

```bash
yarn add @konfy/vue-input
```

---

<vp-holder>
_Standard text input with label, with placeholder, and with both. No validation._

<vue-input label="field label"/>
<vue-input placeholder="placeholder"/>
<vue-input placeholder="placeholder" label="field label"/>
<vue-input label="This field is required" required/>

``` html
<vue-input label="field label"/>
<vue-input placeholder="placeholder"/>
<vue-input placeholder="placeholder" label="field label"/>
<vue-input label="This field is required" required/>
```
</vp-holder>

<vp-holder>
_Other input types:_

<vue-input type="number" label="Number" />
<vue-input type="date" label="Date" />
<vue-input type="time" label="Time" />
<vue-input type="datetime-local" label="Date + Time" />
<vue-input type="month" label="Month" />
<vue-input type="week" label="Week" />
<vue-input type="email" label="Email" auto />
<vue-input type="search" label="Search" />
<vue-input type="tel" label="Telephone Nº" auto />
<vue-input type="url" label="URL" auto />
<vue-input type="color" label="Color" val="#ff0075" />
``` html
<vue-input type="number" label="Number" />
<vue-input type="date" label="Date" />
<vue-input type="time" label="Time" />
<vue-input type="datetime-local" label="Date + Time" />
<vue-input type="month" label="Month" />
<vue-input type="week" label="Week" />
<vue-input type="email" label="Email" auto />
<vue-input type="search" label="Search" />
<vue-input type="tel" label="Telephone Nº" auto />
<vue-input type="url" label="URL" auto />
<vue-input type="color" label="Color" val="#ff0075" />
```
</vp-holder>

<vp-holder>
_Autogrow textarea with counter and max 400 chars._

<vue-input type="textarea" label="Textarea" :max="400" required autogrow counter validate-on="change"/>

``` html
<vue-input type="textarea" label="Textarea" :max="400" validate-on="change" required autogrow counter/>
```
</vp-holder>

## props

| name           | type    | default                             | comment                                  |
| -------------- | ------- | ----------------------------------- | ---------------------------------------- |
| `val`          | any     |                                     | Initial input value                      |
| `type`         | String  | `text`                              | Type of input (see: [supported input types](https://www.w3schools.com/tags/att_input_type.asp) ) + `textarea` |
| `label`        | String  |                                     | Floating label                           |
| `placeholder`  | String  |                                     | Input placeholder                        |
| `name`         | String  |                                     | Input name                               |
| `required`     | Boolean |                                     | Is required                              |
| `autocomplete` | String  | `on`                                | Browser autocomplete feature             |
| `spellcheck`   | Boolean |                                     | Browser spellcheck feature               |
| `pattern`      | String  |                                     | Regex pattern to validate field          |
| `disabled`     | Boolean |                                     | Is disabled                              |
| `readonly`     | Boolean |                                     | Is readonly                              |
| `autogrow`     | Boolean |                                     | Only for: type  `textarea`  – field will grow with text |
| `minHeight`    | String  | `2rem`                              | Minimum height of `textarea` (limits auto grow) |
| `maxHeight`    | String  |                                     | Maximum height of `textarea` (limits auto grow) |
| `counter`      | Boolean |                                     | Character counter for `textarea`         |
| `validateOn`   | String  | `blur`                              | Validate on `blur` or `change`           |
| `equals`       | String  |                                     | Value equals to another field (by ref). Should have the same parent. |
| `min`          | Number  |                                     | Minimum number of characters OR: minimum numeric value, if field type is `number` |
| `max`          | Number  |                                     | Maximum number of characters OR: maximum numeric value, if field type is `number` |
| `validators`   | Array   |                                     | Array of regex expressions to test the field value against |
| `errorMin`     | String  | `Minimum number of characters:`     | Text of error when `min` fails           |
| `errorMax`     | String  | `Max number of characters reached:` | Text of error when `max` fails           |
| `errorEquals`  | String  | `fields do not match`               | Text of error when `equals` fails        |
| `errorCustom`  | String  |                                     | Text of error when your custom regex validator fails |



------

## data

| property       | comment                       |
| -------------- | ----------------------------- |
| `value`        | Value of input                |
| `selected`     | Boolean. Same as focus        |
| `valid`        | Boolean. Is input valid       |
| `errorMessage` | String. Current error message |
| `infoMessage`  | String. Current info message  |
| `filled`       | Boolean. Is input filled      |



------

## methods

| method       | args | comment        |
| ------------ | ---- | -------------- |
| `validate()` | —    | Validate input |



------

## events

| event      | payload             | comment         |
| ---------- | ------------------- | --------------- |
| `enter`    | –                   | On keyup.enter  |
| `blur`     | –                   | On input blured |
| `change`   | –                   | On input        |
| `validate` | is valid: `Boolean` | Once validated  |

## css variables

```css
{
--vue-input-error-color: red;
--vue-input-text-color: black;
--vue-input-select-color: blue;
--vue-input-blur-color: rgba(black, .8);
--vue-input-font-family: system-ui, sans-serif;
--vue-input-label-font-family: system-ui, sans-serif;
--vue-input-border-color: rgba(black, .2);
--vue-input-border-color-active: var(--vue-input-select-color);
--vue-input-border-color-error: var(--vue-input-error-color);
}
```
