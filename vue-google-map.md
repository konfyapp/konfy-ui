---
title: vue-google-map
version: 1.0.0
---

# vue-google-map
<Badge :text="$page.frontmatter.version"/>

This component renders google map with markers. Custom styles available. Almost all google map options supported through props.

::: warning
This component **does not** add the google API script tag to your application, so make sure you add it in the head of your app. The API is source here: https://maps.googleapis.com/maps/api/js?key=YOUR-API-KEY
:::

---

## props:

| property            | type    | default     | comment                       |
| ------------------- | ------- | ----------- | ----------------------------- |
| `lat`               | Number  | `51`        | initial latitude              |
| `lng`               | Number  | `0`         | initial longitude             |
| `zoom`              | zoom    | `14`        | initial zoom                  |
| `disableZoom`       | Boolean |             | disable zoom                  |
| `minZoom`           | Number  |             | minimal zoom                  |
| `maxZoom`           | Number  |             | maximal zoom                  |
| `mapType`           | String  | `'terrain'` | type of map                   |
| `draggable`         | Boolean |             | is map draggable              |
| `noAutoTilt`        | Boolean |             | prevent auto tilt             |
| `disableDefaultUi`  | Boolean |             | disable default UI            |
| `mapTypeControl`    | Boolean |             | enable map type controls      |
| `streetViewControl` | Boolean |             | enable street view controls   |
| `fitToMarkers`      | Boolean |             | fit map to markers            |
| `singleInfoWindow`  | Boolean |             | allow only single info window |
| `mouseEvents`       | Boolean |             | enable mouse events           |
| `dragEvents`        | Boolean |             | enable drag events            |
| `clickEvents`       | Boolean |             | enable click events           |
| `styles`            | Array   | `[]`        | Array of map styles           |
| `markers`           | Array   | `[]`        | Array of map markers          |
| `objects`           | Array   | `[]`        | Array of map objects          |

#### map marker object

Array of map marker objects can be passed to `markers` attribute. Marker object is the same as `google.maps.MarkerOptions`, so it can contain the same data. The only difference is animation property – here you can pass a simple string with animation name, instead of the full `google.maps.Animation`.

marker object can also have additional `info` property, of type String. It will then be accessible in info window.

__Example marker object:__

```html
<!-- in your template: -->
<vue-google-map :markers=[marker]></template>
<!-- ... -->

<script>
//...
data() {
  return {
    marker: {
      info: '<h1>Hello!<h1> Html can work too!' // info will turn into infowindow
      position: {
        lat: Float,
        lng: Float
      }
      title: String,
      animation: String, // 'DROP' || 'BOUNCE'
      icon: String, // 'path/to/marker/icon.svg'
    }
  }
}
</script>
```



---

## data:

| property     | comment              |
| ------------ | -------------------- |
| `map`        | google map object    |
| `mapMarkers` | Array of map markers |



---

## methods:

| method              | args | comment            |
| ------------------- | ---- | ------------------ |
| `updateMapCenter()` | –    | update map center  |
| `clearMarkers()`    | –    | clear map markers  |
| `fitMapToMarkers()` | –    | fit map to markers |



---

## events:

| event            | payload       | comment               |
| ---------------- | ------------- | --------------------- |
| `map:render`     |               | on map rendered       |
| `map:center`     | center coords | on map centered       |
| `markers:change` | map markers   | on map markers change |



---

#### TODO'S:

map objects
map polygons
marker clusters

