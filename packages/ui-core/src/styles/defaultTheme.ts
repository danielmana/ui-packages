import { teal } from '@mui/material/colors';

import { ThemeOptions } from './types';
import createColor from './createColor';

const defaultTheme: ThemeOptions = {
  palette: {
    tertiary: createColor(teal.A700),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
};

export default defaultTheme;
