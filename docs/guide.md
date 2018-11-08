---
title: guide
---
## Introduction
Konfy is a collection of "workhorse" Vue components – focused on common UI interaction tasks, rather than static layout elements. Each component is built with these principles in mind:
- **versatility** - try to cover every common use scenario.
- **light markup** – no needless garnish, *renderless* whenever it's a good idea. Some components are a just aa single tag. In the same time, all components adhere to common design patterns and are ready to use out of the box.
- **single responsibility** – Decouple components that do not necessarily need to go together (like datepicker from input).
- **mobile ready** – Every component should be equaly comfortable to use on desktop and mobile.

## Instalation


## Customize CSS
Each component uses some css variables that set a theme for its appearance.
You can redefine these variables globaly, or override them for a single instance:
```css
body {
    --vue-input-error-color: yellow;
    --vue-input-text-color: #ccc;
    /* etc. */
}
```

You can also override component's inner markup styling directly using `>>>` selector:
```css
.vue-input >>> input {
    /* Custom styling */
}
```
## Roadmap
Following components are currently underway:
- datepicker
- number input
- tabs
- sortable list
- carousel