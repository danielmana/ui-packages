---
product: ui-core
title: React Stack component
components: Stack
githubLabel: 'component: Stack'
---

# Stack

<p class="description">The Stack component manages layout of immediate children along the vertical or horizontal axis with optional spacing and/or dividers between each child.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Usage

`Stack` is concerned with one-dimensional layouts. The default direction is `column` which stacks children vertically.

{{"demo": "BasicStack.js", "bg": true}}

To control space between children, use the `spacing` prop.
The spacing value can be any number, including decimals and any string.

## Direction

By default, `Stack` arranges items vertically in a `column`.
However, the `direction` prop can be used to position items horizontally in a `row` as well.

{{"demo": "DirectionStack.js", "bg": true}}

## Dividers

Use the `divider` prop to insert an element between each child. This works particularly well with the [Divider](https://mui.com/material-ui/react-divider/) component.

{{"demo": "DividerStack.js", "bg": true}}

## Responsive values

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"demo": "ResponsiveStack.js", "bg": true}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "InteractiveStack.js", "hideToolbar": true, "bg": true}}

## System props

As a CSS utility component, the `Stack` supports all [`MUI system`](https://mui.com/system/properties/) properties. You can use them as props directly on the component.
For instance, a margin-top:

```jsx
<Stack mt={2}>
```
