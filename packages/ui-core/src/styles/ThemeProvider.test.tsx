import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { ThemeProvider } from '@danielmana/ui-core/styles';
import { Button } from '@danielmana/ui-core';
import { buttonClasses as classes } from '@mui/material/Button';

describe('[ui-core] ThemeProvider', () => {
  const { render } = createRenderer();
  it('can render a text secondary button', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <Button color="secondary">Hello World</Button>
      </ThemeProvider>,
    );
    const button = getByRole('button');

    expect(button).to.have.class(classes.textSecondary);
  });
});
