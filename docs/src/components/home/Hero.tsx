import * as React from 'react';

import Box from '@mui/material/Box';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function Hero() {
  return (
    <Container sx={{ mt: 6 }}>
      <Grid container wrap="nowrap" sx={{ height: '100%', mx: 'auto' }}>
        <Grid item md={12}>
          {[
            'ui-core',
            'ui-icons',
            'ui-utils',
            'ui-components',
            'ui-forms',
            'ui-model',
            'ui-model-legacy',
          ].map((label) => (
            <Box mb={2}>
              <GetStartedButtons
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                label={label}
                installation={`npm i @danielmana/${label}`}
                to={`/${label}/getting-started/overview/`}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
