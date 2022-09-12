import * as React from 'react';

import { createRenderer, describeConformance } from 'test/utils';
import Stack from '@danielmana/ui-core/Stack';

describe('<Stack />', () => {
  const { render } = createRenderer();

  describeConformance(<Stack />, () => ({
    render,
    inheritComponent: 'div',
    refInstanceof: window.HTMLDivElement,
    muiName: 'UICoreStack',
    skip: ['componentProp', 'componentsProp', 'rootClass', 'themeVariants', 'themeStyleOverrides'],
  }));
});
