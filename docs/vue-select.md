---
title: vue-select
flavors: [vanila, chocolate, strawberry, banana, orange, cream, cookie dough, pistachio]
---
<style scoped lang='stylus'>
.vp-holder
    max-width 540px
.vue-input.color
    max-width 40px
</style>

# vue-select

![npm](https://img.shields.io/npm/v/@konfy/vue-select.svg)

- versatile and feature rich dropdown select component
- Allows for selecting single or multiple values
- Optionally searchable
- Optional validation
- Optionally mutable – user can select values from list, but also add own

## Installation

```bash
yarn add @konfy/vue-select
```

---

<vp-holder>
_Simple setup, choose just 1 option_

<vue-select :options="$page.frontmatter.flavors" />
<vue-select :options="$page.frontmatter.flavors" label="Non searchable" :searchable="false" />
<vue-select :options="$page.frontmatter.flavors" label="Required" required />
<vue-select :options="$page.frontmatter.flavors" label="Default selected" default="chocolate" />
</vp-holder>

```html
<vue-select :options="flavors" />
<vue-select :options="flavors" label="Non searchable" :searchable="false" />
<vue-select :options="flavors" label="Required" required />
<vue-select :options="flavors" label="Default selected" default="chocolate" />
```
<vp-holder>
_choose multiple options with different limitations_

_You can select same flavor many times:_

<vue-select :options="$page.frontmatter.flavors" label="Choose flavors:" multiple />

_You can select each flavor only once:_

<vue-select :options="$page.frontmatter.flavors" label="Choose flavors:" multiple set />

_You can select only 3 flavors:_

<vue-select :options="$page.frontmatter.flavors" label="Choose flavors:" :maxValues="3" multiple />

_You can add your own flavors:_

<vue-select :options="$page.frontmatter.flavors" label="Choose flavors:" multiple mutable set/>
</vp-holder>

```html
<vue-select :options="flavors" label="Choose flavors:" multiple />
<vue-select :options="flavors" label="Choose flavors:" multiple set />
<vue-select :options="flavors" label="Choose flavors:" multiple set :maxValues="3" />
<vue-select :options="flavors" label="Choose flavors:" multiple set mutable/>
```


## props

| property       | type    | default                  | comment                                                      |
| -------------- | ------- | ------------------------ | ------------------------------------------------------------ |
| `name`         | String  |                          | name of the input field                                      |
| `options`      | Array   | `[]`                     | Array of selectable options. It can be an array of **strings**: `['Option1','Option2']` or **objects**: `[{value: 'opt1', label:'Option 1'}]`. In the case of strings, value - label pairs will be created automatically. |
| `default`      | String  |                          | Default option `value` . Applies only in single selection mode. |
| `defaults`     | Array   | `[]`                     | Array of default options `values` . Applies only when multiple selection is enabled (`multpiple="true"`). |
| `multiple`     | Boolean | `false`                  | Enables multiple selection mode.                             |
| `maxValues`    | Number  |                          | Maximum number of options that can be selected in multiple selection mode. |
| `set`          | Boolean | `false`                  | If set to false, user can select the same values many times. Otherwise selected values are unique. Applies only when multiple selection is enabled. |
| `mutable`      | Boolean | `false`                  | If true, user can add own values to the select options.      |
| `required`     | Boolean | `false`                  | Is selection required.                                       |
| `searchable`   | Boolean | `true`                   | Is list searchable.                                          |
| `maxHeight`    | String  | `8rem`                   | Max height of dropdown.                                      |
| `label`        | String  | `Choose option`          | List label.                                                  |
| `errorMessage` | String  | `This field is required` | Error message.                                               |
| `infoMessage`  | String  |                          | Info message.                                                |

## data

| property         | comment                                                      |
| ---------------- | ------------------------------------------------------------ |
| `active`         | Boolean. Is select list is open.                             |
| `info`           | Info message.                                                |
| `valid`          | Boolean. True if valid.                                      |
| `mutableOptions` | Array. Mutable options added by user. Only if `mutable`.     |
| `value`          | Object. Selected value: `{value: <VALUE>, label: <LABEL>}`. Only if not `multiple`. |
| `values`         | Array. Selected values: `[{value: <VALUE>, label: <LABEL>}]`. Only if `multiple`. |


## methods

| method               | args            | comment                                  |
| -------------------- | --------------- | ---------------------------------------- |
| `validate()`         |                 | Validate instance.                       |
| `focusSearch()`      |                 | Focus list search field.                 |
| `blurSearch()`       |                 | Blur list search field.                  |
| `createMutable(val)` | `val: <String>` | Create a new value and add it options list. |

## events

| event            | payload             | comment             |
| ---------------- | ------------------- | ------------------- |
| `validate`       | is valid: `Boolean` | on validation.      |
| `search:blur`    | –                   | on search blur.     |
| `remove`         | removed value       | value is removed.   |
| `select`         | selected value      | on value select.    |
| `add`            | added value         | on value added.     |
| `create:mutable` | created option      | on mutable created. |

## css variables

```css
{
  --vue-input-text-color: black;
  --vue-input-error-color: red;

  --vue-input-font-family: system-ui, sans-serif;
  --vue-input-label-font-family: system-ui, sans-serif;
  --vue-input-border-color: rgba(black, .2);
  --vue-input-select-color: blue;
  --vue-input-blur-color: rgba(black, .8);

  --vue-option-hover-color: white;
  --vue-option-hover-bg: blue;
  --vue-option-selected-bg: rgba(black, .1);
  --vue-option-selected-color: var(--vue-input-text-color);

  --vue-tag-text-color: rgba(black, .8);
  --vue-tag-text-color-hover: red;
  --vue-tag-text-color-active: blue;

  --vue-tag-border-color: rgba(black, .3);
  --vue-tag-border-color-hover: rgba(black, .3);
  --vue-tag-border-color-active: rgba(black, .3);

  --vue-tag-bg: rgba(black, .1);
  --vue-tag-bg-hover: rgba(red, .1);
  --vue-tag-bg-active: rgba(blue, .1);

  --vue-tag-shadow: 0 2px 5px 0 rgba(black, .2);
}
```
