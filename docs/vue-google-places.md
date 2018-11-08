---
props:title: vue-google-places
version: 0.0.1
---

# vue-google-places
<Badge :text="$page.frontmatter.version" type="warn"/>
<Badge text="work in progress" type="error"/>

::: warning
This component **does not** add the google API script tag to your application, so make sure you add it in the head of your app. The API source is here: https://maps.googleapis.com/maps/api/js?key=YOUR-API-KEY&libraries=places
:::

---

<vp-holder>
<vue-google-places></vue-google-places>
<vue-google-places label="Input required" required enableGeolocation></vue-google-places>
</vp-holder>

## props

| property            | type    | default                | comment                                                      |
| ------------------- | ------- | ---------------------- | ------------------------------------------------------------ |
| `val`               | String  |                        | Initial value                                                |
| `label`             | String  | `Enter location`       | Input label                                                  |
| `types`             | String  | `geocode`              | Type of search. possible values: `establishment`,`address`,`geocode`. See [API docs](https://developers.google.com/maps/documentation/javascript/places-autocomplete) for more info |
| `country`           | String  | `null`                 | Can be used to restrict results to specific coutries. Use alpha-2 compatible country code. Multiple countries must be comma passed. See [API docs](https://developers.google.com/maps/documentation/javascript/places-autocomplete) for more info |
| `enableGeolocation` | Boolean | `false`                | Enable geolocation from user’s browser                       |
| `errorMessage`      | String  | `Location is required` | Error message                                                |
| `infoMessage`       | String  |                        | Info message on success                                      |
| `required`          | Boolean |                        | Input must be filled                                         |

## data

| value      | type    | comment           |
| ---------- | ------- | ----------------- |
| `selected` | Boolean | Place is selected |
| `valid`    | Boolean | Input is valid    |
| `value`    | Object  | Input value       |

## methods

| method       | args | comment        |
| ------------ | ---- | -------------- |
| `validate()` |      | Validate input |
| `clear()`    |      | Clear value    |
| `focus()`    |      | Focus input    |
| `blur()`     |      | Blur input     |

## events

| event           | payload                   | comment             |
| --------------- | ------------------------- | ------------------- |
| `focus`         |                           | Input was focused   |
| `blur`          |                           | Input was blurred   |
| `place:changed` | `formattedPlace`, `place` | Place changed       |
| `not-found`     |                           | Place was not found |

