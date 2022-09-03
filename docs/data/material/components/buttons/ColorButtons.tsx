import * as React from 'react';

import { Button, createTheme, ThemeProvider } from '@danielmana/ui-core';
import Stack from '@mui/material/Stack';

export default function ColorButtons() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Stack direction="row" spacing={2}>
        <Button color="primary">Primary</Button>
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
