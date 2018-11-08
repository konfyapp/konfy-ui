---
title: vue-button-group
options: [Apples, Oranges, Bananas, Peaches]
---
# vue-button-group
![npm](https://img.shields.io/npm/v/@konfy/vue-button-group.svg)

Single or multiple choice input. Great when you need it in concise, horizontal space.

## Installation

```bash
yarn add @konfy/vue-button-group
```

<vp-holder>

<vue-button-group :options="$page.frontmatter.options" info="Choose one option (consise):" name="options"/>

<vue-button-group :options="$page.frontmatter.options" info="Choose one option, required:" name="options" required equal/>

<vue-button-group :options="$page.frontmatter.options" info="Choose many options:" name="options" multiple equal/>
</vp-holder>

``` html
<vue-button-group :options="options" info="Choose one option:" name="options"/>

<vue-button-group :options="options" info="Choose one option, required:" name="options" required equal/>

<vue-button-group :options="options" info="Choose many options:" name="options" multiple equal/>

```

## props

| property   | type    | default | comment                                                      |
| ---------- | ------- | ------- | ------------------------------------------------------------ |
| `name`     | String  |         | name of the input                                            |
| `info`     | String  |         | Info on top of the button-group                              |
| `equal`    | Boolean | `false` | Buttons have equal size if true                              |
| `multiple` | Boolean | `false` | Should allow multiple selection                              |
| `options`  | Array   | `[]`    | Array of options. Can be strings or {value, label} pair objects. |
| `required` | Boolean | `false` | if not required, a 'clear' button will also show up          |
| `default`  | Any     |         | default selected value.                                      |

## data

| property | type        | comment                  |
| -------- | ----------- | ------------------------ |
| `value`  | Any         | Selected value           |
| `values` | Array [Any] | Array of selected values |
| `label`  | String      | Selected label           |
| `valid`  | Boolean     | Is valid                 |

## methods

| method           | args                   | comment                |
| ---------------- | ---------------------- | ---------------------- |
| `select(option)` | `option`: option value | Select option          |
| `clear()`        | –                      | Clear selected options |
| `validate()`     | –                      | Validate               |

## events

| event          | payload               | comment         |
| -------------- | --------------------- | --------------- |
| `value:change` | selected option `any` | on value change |

## css variables

``` css
{
	// color
	--vue-button-group-text-off: rgba(black, .7);
	--vue-button-group-text-hover: black;
	--vue-button-group-text-on: white;
	// border
	--vue-button-group-border-color: rgba(black, .2);
	--vue-button-group-border-color-hover: rgba(black, .2);
	--vue-button-group-border-color-active: rgba(black, .2);
	--vue-button-group-border-radius: 3px;
	// background
	--vue-button-group-bg: white;
	--vue-button-group-bg-hover: transparent;
	--vue-button-group-bg-active: rgba(black, .2);
	--vue-button-group-selected: #007AFF;
	// shadow
	--vue-button-group-shadow: 0 1px 5px 0 rgba(black, .3);
	--m2-error-color: #EC4B68;
}
```