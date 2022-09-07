import { teal } from '@mui/material/colors';
import {
  adaptV4Theme as muiAdaptV4Theme,
  createTheme as muiCreateTheme,
  DeprecatedThemeOptions,
  ThemeOptions,
} from '@mui/material/styles';

const { palette } = muiCreateTheme();
const { augmentColor } = palette;

export const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

/**
 * Generate a theme base on the V4 theme options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready-to-use theme object.
 */
export const adaptV4Theme = (options: ThemeOptions | DeprecatedThemeOptions) => {
  const result = muiAdaptV4Theme(options);

  // Ensure additional colors exist
  result.palette.tertiary ||= createColor(teal.A700);

  // Remove legacy components
  delete result.components?.MuiStepConnector;
  delete result.components?.MuiStep;

  return result;
};

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts. Supports options from MUI v3, v4 and v5.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object for MUI v5
 */
const createTheme = (options?: ThemeOptions | DeprecatedThemeOptions, ...args: object[]) =>
  muiCreateTheme(adaptV4Theme(options || {}), args);

export default createTheme;
