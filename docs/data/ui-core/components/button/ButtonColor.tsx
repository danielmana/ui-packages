import * as React from 'react';

import { Stack } from '@mui/material';
import { Button, ThemeProvider } from '@danielmana/ui-core';

export default function ButtonColor() {
  return (
    <ThemeProvider>
      <Stack direction="row" spacing={2}>
        <Button color="secondary">Secondary</Button>
        <Button color="tertiary">Tertiary</Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
