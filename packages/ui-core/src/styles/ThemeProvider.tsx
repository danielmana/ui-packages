import * as React from 'react';
import { Theme, ThemeProvider as MuiThemeProvider, useTheme } from '@mui/material/styles';
import createTheme from './createTheme';

export default function ThemeProvider({
  children,
  theme,
}: React.PropsWithChildren<{
  theme?: Theme;
}>) {
  const currentTheme = useTheme();
  return <MuiThemeProvider theme={theme || createTheme(currentTheme)}>{children}</MuiThemeProvider>;
}
