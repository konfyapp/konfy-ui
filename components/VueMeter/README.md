# vue-meter 

Component for displaying progress

- single svg
- text percentage
- default slot for text
- customizable size, color, etc

## props

| property  | type    | default              | comment                  |
| --------- | ------- | -------------------- | ------------------------ |
| `percent` | Number  | `0`                  | percentage progress      |
| `num`     | Boolean | `false`              | Should show % text       |
| `r`       | Number  | `20`                 | radius in `px`           |
| `s`       | Number  | `5`                  | stroke width in `px`     |
| `bg`      | String  | `rgba(0, 0, 0, 0.1)` | css color for background |
| color     | String  | `blue`               | css color for stroke     |