import { createTheme as muiCreateTheme, DeprecatedThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import defaultTheme, { ThemeOptions } from './defaultTheme';
import sanitizeThemeOptions from './sanitizeThemeOptions';

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts. Supports options from MUI v3, v4 and v5.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object for MUI v5
 */
const createTheme = (options?: ThemeOptions | DeprecatedThemeOptions, ...args: object[]) => {
  const themeOptions = deepmerge(defaultTheme, sanitizeThemeOptions(options || {}));
  return muiCreateTheme(themeOptions, args);
};

export default createTheme;
