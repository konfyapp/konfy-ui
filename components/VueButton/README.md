# vue-button

A stateful button component.

``` html
<vue-button> Default state </vue-button>
<vue-button state="processing"> processing </vue-button>
<vue-button state="done"> done </vue-button>
<vue-button state="failed"> failed </vue-button>
<vue-button state="disabled"> disabled </vue-button>
```
## props

|property|type  |default|comment     |
|--------|------|-------|------------|
|`state` |String|       |Button state|

## events

| name    | payload      | comment                           |
| ------- | ------------ | --------------------------------- |
| `click` | `this.state` | Click event with state as payload |

## css variables

``` css
{
    --vue-button-bg-grad: linear-gradient(180deg, rgba(white, 0.25) 0%, transparent 100%);
    --vue-button-color: #007AFF;
    --vue-button-color-disabled: rgba(black, .2);
    --vue-button-color-processing: rgba(#007AFF, .7);
    --vue-button-color-done: #2DE185;
    --vue-button-color-failed: #EC4B68;
    --vue-button-text-color: white;
}
```