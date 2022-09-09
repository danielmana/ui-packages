import * as React from 'react';
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import createTheme from './createTheme';

export default function ThemeProvider({
  children,
  theme,
}: React.PropsWithChildren<{
  theme?: Theme;
}>) {
  return <MuiThemeProvider theme={theme || createTheme()}>{children}</MuiThemeProvider>;
}
