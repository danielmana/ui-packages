import * as React from 'react';

import { Button, Stack } from '@danielmana/ui-core';

export default function ButtonColor() {
  return (
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
  );
}
