---
title: vue-button-alt
version: 1.0.0
---

# vue-button-alt
<Badge :text="$page.frontmatter.version"/>

Alternative light button

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