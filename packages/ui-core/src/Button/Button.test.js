import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';

import Button, { buttonClasses as classes } from '@danielmana/ui-core/Button';
import { ButtonBase } from '@mui/material/ButtonBase';

describe('<Button />', () => {
  const { render } = createRenderer();

  describeConformance(<Button startIcon="icon">Conformance?</Button>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiButton',
    testDeepOverrides: { slotName: 'startIcon', slotClassName: classes.startIcon },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentsProp'],
  }));

  it('should render with the root, text, and textPrimary classes but no others', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.text);
    expect(button).to.have.class(classes.textPrimary);
    expect(button).not.to.have.class(classes.textSecondary);
    expect(button).not.to.have.class(classes.outlined);
    expect(button).not.to.have.class(classes.outlinedPrimary);
    expect(button).not.to.have.class(classes.outlinedSecondary);
    expect(button).not.to.have.class(classes.contained);
    expect(button).not.to.have.class(classes.containedPrimary);
    expect(button).not.to.have.class(classes.containedSecondary);
    expect(button).not.to.have.class(classes.textSizeSmall);
    expect(button).not.to.have.class(classes.textSizeLarge);
    expect(button).not.to.have.class(classes.outlinedSizeSmall);
    expect(button).not.to.have.class(classes.outlinedSizeLarge);
    expect(button).not.to.have.class(classes.containedSizeSmall);
    expect(button).not.to.have.class(classes.containedSizeLarge);
  });
});
