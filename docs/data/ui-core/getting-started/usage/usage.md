# UI Core - Usage

<p class="description">Get started with React and UI Core in no time.</p>

UI Core components work in isolation.
**They are self-supporting**, and will only inject the styles they need to display.
They don't rely on any global style-sheets such as [normalize.css](https://github.com/necolas/normalize.css/).

You can use any of the components as demonstrated in the documentation.
Please refer to each component's [demo page](/ui-core/react-button/) to see how they should be imported.

## Quick start

Here's a quick example to get you started:

{{"demo": "UsageDemo.js"}}

## Globals

UI Core usage experience can be improved with a handful of important globals that you'll need to be aware of.

### Responsive meta tag

MUI is developed mobile-first, a strategy in which we first write code for mobile devices, and then scale up components as necessary using CSS media queries.
To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element.

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

## Next steps

Now that you have an idea of the basic setup, it's time to learn more about:

- How to provide [the Material Design font and typography](/ui-core/react-typography/).
- How to take advantage of the [theming solution](/ui-core/customization/theming/).
- How to [override](/ui-core/customization/how-to-customize/) the look and feel of the components.
