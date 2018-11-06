---
title: vue-meter
version: 1.0.0
---
<style scoped lang='stylus'>
    svg.vue-meter.red
        filter drop-shadow(0 0 3px rgba(#FE3824, .6))
        fill #FE3824
</style>

# vue-meter 

<Badge :text="$page.frontmatter.version"/>

Component for displaying progress

- single svg
- text percentage
- default slot for text
- customizable size, color, etc

<vp-holder>

Vue meter

<vue-meter :percent="70"/>

Custom stroke width, diameter, color, with counter

<vue-meter class="red" :percent="50" :r="30" :s="2" color="#FE3824">25/50</vue-meter>
</vp-holder>

## props

| property  | type    | default              | comment                  |
| --------- | ------- | -------------------- | ------------------------ |
| `percent` | Number  | `0`                  | percentage progress      |
| `num`     | Boolean | `false`              | Should show % text       |
| `r`       | Number  | `20`                 | radius in `px`           |
| `s`       | Number  | `5`                  | stroke width in `px`     |
| `bg`      | String  | `rgba(0, 0, 0, 0.1)` | css color for background |
| color     | String  | `blue`               | css color for stroke     |