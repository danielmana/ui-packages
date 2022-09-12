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
import { StackProps } from '../Stack/StackProps';
import { StackClassKey } from '../Stack/stackClasses';

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
    UICoreStack: StackClassKey;
  }
  interface ComponentsPropsList {
    UICoreButton: ButtonProps;
    UICoreStack: StackProps;
  }
}

export interface Components<Theme = unknown> {
  UICoreButton?: {
    defaultProps?: ComponentsProps['UICoreButton'];
    styleOverrides?: ComponentsOverrides<Theme>['UICoreButton'];
  };
  UICoreStack?: {
    defaultProps?: ComponentsProps['UICoreStack'];
    styleOverrides?: ComponentsOverrides<Theme>['UICoreStack'];
  };
}

export interface ThemeOptions extends MuiThemeOptions {
  components?: MuiComponents<Omit<Theme, 'components'>> & Components;
}
