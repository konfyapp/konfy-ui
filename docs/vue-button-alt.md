---
title: vue-button-alt
---

# vue-button-alt
![npm](https://img.shields.io/npm/v/@konfy/vue-button-alt.svg)

Alternative light button

## Installation

```bash
yarn add @konfy/vue-button-alt
```

<vp-holder>
<vue-button-alt type="float">I am floating</vue-button-alt>

<vue-button-alt type="sink">I am sinking</vue-button-alt>
</vp-holder>

``` html
<vue-button-alt type="float">I am floating</vue-button-alt>
<vue-button-alt type="sink">I am sinking</vue-button-alt>
```

## props

|property|type  |default|comment                       |
|--------|------|-------|------------------------------|
|`type`  |String|`float`|Button type: `float` or `sink`|

## events

| name    | payload | comment     |
| ------- | ------- | ----------- |
| `click` | –       | Click event |

## css variables

``` css
{
    --vue-button-alt-color: blue;
}

```