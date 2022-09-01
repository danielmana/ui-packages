import { PaletteColor, PaletteColorOptions } from '@mui/material';

// Add colors to `theme.palette`
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
  }
  interface PaletteOptions {
    tertiary: PaletteColorOptions;
  }
}

// Add colors to the Button. E.g. `<Button color="tertiary" ... />`
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
