import _ from 'lodash';

import { teal } from '@mui/material/colors';
import { createTheme as muiCreateTheme, ThemeOptions } from '@mui/material/styles';

const { palette } = muiCreateTheme();
const { augmentColor } = palette;

export const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

type ThemeOptionsLegacy = ThemeOptions & { overrides: any; props: any };

export const sanitizeThemeOptions = (options?: ThemeOptionsLegacy): ThemeOptions => ({
  ..._.omit(options, ['overrides', 'props']),
  components: {
    // `overrides/[name]/value` to `components/[name]/styleOverrides/value`
    ..._.mapValues(_.omit(options?.overrides, ['MuiStepConnector', 'MuiStep']), (value) => ({
      styleOverrides: value,
    })),
    // `props/[name]/value` to `components/[name]/defaultProps/value`
    ..._.mapValues(options?.props, (value) => ({
      defaultProps: value,
    })),
    ...options?.components,
  },
  // Ensure additional colors exist
  palette: {
    tertiary: createColor(teal.A700),
    ...options?.palette,
  },
});

const createTheme = (options?: ThemeOptionsLegacy, ...args: object[]) =>
  muiCreateTheme(sanitizeThemeOptions(options), args);

export default createTheme;
