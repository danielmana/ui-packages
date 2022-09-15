import * as React from 'react';
import { describeConformance, createRenderer } from 'test/utils';

import { Stepper } from '@danielmana/ui-core';
import MyComponent from './MyComponent';

describe('<MyComponent />', () => {
  const { render } = createRenderer();

  describeConformance(<MyComponent />, () => ({
    inheritComponent: Stepper,
    render,
    refInstanceof: window.HTMLDivElement,
    only: ['reactTestRenderer'],
  }));
});
