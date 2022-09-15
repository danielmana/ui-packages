import * as React from 'react';

import Box from '@mui/material/Box';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import uiCorePkgJson from '../../../../packages/ui-core/package.json';

const versions: Record<string, string> = {
  'ui-core': uiCorePkgJson.version,
};

export default function Hero() {
  return (
    <Container sx={{ mt: 6 }}>
      <Grid container wrap="nowrap" sx={{ height: '100%', mx: 'auto' }}>
        <Grid item md={12}>
          {[
            `ui-core`,
            'ui-components',
            'ui-forms',
            'ui-model',
            'ui-model-legacy',
            'ui-icons',
            'ui-utils',
          ].map((label) => (
            <Box key={label} mb={2}>
              <GetStartedButtons
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                label={`${label}${versions[label] ? `#${versions[label]}` : ''}`}
                installation={`npm i @danielmana/${label}`}
                to={`/${label}/getting-started/overview/`}
                disabled={!versions[label]}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
