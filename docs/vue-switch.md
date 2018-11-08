---
title: vue-switch
---
<style scoped lang='stylus'>
.vue-switch.custom
    --switch-color-on green
    --switch-color-off pink
.vue-switch.green
    --switch-color-on #00BD8E
</style>

# vue-switch

![npm](https://img.shields.io/npm/v/@konfy/vue-switch.svg)

## Installation

```bash
yarn add @konfy/vue-switch
```


<vp-holder>
Sizes: S / M / L (default m)

<vue-switch/>
<vue-switch size="s"/>
<vue-switch size="l" on/>

``` html
<vue-switch/>
<vue-switch size="s"/>
<vue-switch size="l" on/>
```

With label text

<vue-switch size="l" on> <span slot="on">ON</span> <span slot="off">OFF</span> </vue-switch>

``` html
<vue-switch size="l" on>
    <span slot="on">ON</span>
    <span slot="off">OFF</span>
</vue-switch>
```

Custom color with css variables

<vue-switch class="custom" on></vue-switch>
<vue-switch class="green" on></vue-switch>

``` css
.vue-switch.custom {
    --switch-color-on: green;
    --switch-color-off: pink;
}
.vue-switch.green {
    --switch-color-on: #00BD8E;
}
```
</vp-holder>

## props

| property   | type    | default | comment                 |
| ---------- | ------- | ------- | ----------------------- |
| `name`     | String  |         | name of the input field |
| `on`       | Boolean | `false` | on / off                |
| `size`     | String  | `m`     | `s` `m` `l`             |
| `disabled` | Boolean |         | disable switch          |
| loading    | Boolean |         | loading state           |

## data

| property | comment     |
| -------- | ----------- |
| `value`  | input value |

## methods

| method     | comment       |
| ---------- | ------------- |
| `toggle()` | toggle switch |

## css variables

```css
{
 	--switch-color-on: #2181FF;
	--switch-color-off: #BBB;
	--switch-color-disabled: #F3F3F3;
}
```

