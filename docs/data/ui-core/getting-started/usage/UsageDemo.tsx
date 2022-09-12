import * as React from 'react';

import { Button, ThemeProvider } from '@danielmana/ui-core';

export default function UsageDemo() {
  return (
    <ThemeProvider>
      <Button variant="contained">Hello World</Button>
    </ThemeProvider>
  );
}
