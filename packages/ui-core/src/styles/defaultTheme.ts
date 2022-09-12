import { teal } from '@mui/material/colors';
import {
  Components as MuiComponents,
  Theme,
  ThemeOptions as MuiThemeOptions,
} from '@mui/material/styles';

import { Components } from './components';
import createColor from './createColor';

export interface ThemeOptions extends MuiThemeOptions {
  components?: MuiComponents<Omit<Theme, 'components'>> & Components;
}

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
