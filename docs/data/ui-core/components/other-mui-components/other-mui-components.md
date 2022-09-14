# Other Components

<p class="description">A bunch of 3rd party components are also available on UI Core.</p>

After [installation](/ui-core/getting-started/installation/), you can import other components from `@danielmana/ui-core` so parent projects are agnostic about peer dependencies, extensions, and possible changes on the paradigm.

## MUI Components

All [MUI Components](https://mui.com/material-ui/) are available:

```jsx
import { Slider } from '@danielmana/ui-core';

export default function Demo() {
  return <Slider defaultValue={30} />;
}
```

:::info
Note that [some MUI components](/ui-core/) are enhanced by UI Core.
:::
