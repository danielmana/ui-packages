import {
  ComponentsOverrides,
  ComponentsProps,
  PaletteColor,
  PaletteColorOptions,
  Components as MuiComponents,
  Theme,
  ThemeOptions as MuiThemeOptions,
} from '@mui/material/styles';

import { ButtonProps } from '../Button/ButtonProps';
import { ButtonClassKey } from '../Button/buttonClasses';

// Add colors to `theme.palette`
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}

// Add colors to the Button. E.g. `<Button color="tertiary" ... />`
// https://stackoverflow.com/a/69836010/12993819
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

// Add UI Core components to theme
declare module '@mui/material/styles' {
  interface ComponentNameToClassKey {
    UICoreButton: ButtonClassKey;
  }
  interface ComponentsPropsList {
    UICoreButton: ButtonProps;
  }
}

export interface Components<Theme = unknown> {
  UICoreButton?: {
    defaultProps?: ComponentsProps['UICoreButton'];
    styleOverrides?: ComponentsOverrides<Theme>['UICoreButton'];
  };
}

export interface ThemeOptions extends MuiThemeOptions {
  components?: MuiComponents<Omit<Theme, 'components'>> & Components;
}
