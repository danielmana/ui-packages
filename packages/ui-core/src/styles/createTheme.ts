import _ from 'lodash';

import { teal } from '@mui/material/colors';
import { createTheme as muiCreateTheme, ThemeOptions } from '@mui/material/styles';

const { palette } = muiCreateTheme();
const { augmentColor } = palette;

export const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

type ThemeOptionsLegacy = ThemeOptions & { overrides?: any; props?: any };

/**
 * Sanitizes theme options to be used with the ui-core ThemeProvider.
 * Supports options from MUI v3, v4 and v5.
 * @param options Takes an incomplete theme object, fixes the structure and adds required fields.
 * @returns A theme options object to be used to create MUI v5 themes
 */
export const sanitizeThemeOptions = (options?: ThemeOptionsLegacy) => ({
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

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts. Supports options from MUI v3, v4 and v5.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object for MUI v5
 */
const createTheme = (options?: any, ...args: object[]) =>
  muiCreateTheme(sanitizeThemeOptions(options), args);

export default createTheme;
