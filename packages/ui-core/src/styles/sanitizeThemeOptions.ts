import { ThemeOptions } from '@mui/material/styles';
import { createBreakpoints, createSpacing } from '@mui/system';

/**
 * Generate a sanitized theme based on the theme options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready-to-use theme object.
 */
export default function sanitizeThemeOptions(inputTheme: any): ThemeOptions {
  const {
    defaultProps = {},
    mixins = {},
    overrides = {},
    palette = {},
    props = {},
    styleOverrides = {},
    ...other
  } = inputTheme;
  const theme = {
    ...other,
    components: {},
  };

  // default props
  Object.keys(defaultProps).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = defaultProps[component];
    theme.components[component] = componentValue;
  });

  Object.keys(props).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = props[component];
    theme.components[component] = componentValue;
  });

  // CSS overrides
  Object.keys(styleOverrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = styleOverrides[component];
    theme.components[component] = componentValue;
  });

  Object.keys(overrides).forEach((component) => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = overrides[component];
    theme.components[component] = componentValue;
  });

  // theme.spacing
  theme.spacing = createSpacing(inputTheme.spacing);

  // theme.mixins.gutters
  const breakpoints = createBreakpoints(inputTheme.breakpoints || {});
  const spacing = theme.spacing;

  theme.mixins = {
    gutters: (styles: any = {}) => {
      return {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        ...styles,
        [breakpoints.up('sm')]: {
          paddingLeft: spacing(3),
          paddingRight: spacing(3),
          ...styles[breakpoints.up('sm')],
        },
      };
    },
    ...mixins,
  };

  const { type: typeInput, mode: modeInput, ...paletteRest } = palette;

  const finalMode = modeInput || typeInput || 'light';

  theme.palette = {
    // theme.palette.text.hint
    text: {
      hint: finalMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)',
    },
    mode: finalMode,
    type: finalMode,
    ...paletteRest,
  };

  // Extend components in case of using a V5 theme
  const components = (inputTheme as Partial<ThemeOptions>).components;
  theme.components = {
    ...theme.components,
    ...components,
  };

  // Remove legacy components
  delete theme.components?.MuiStepConnector;
  delete theme.components?.MuiStep;

  return theme;
}
