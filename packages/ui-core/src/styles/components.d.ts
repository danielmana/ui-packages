import { ComponentsOverrides, ComponentsProps } from '@mui/material/styles';

import { ButtonProps } from '../Button/ButtonProps';
import { ButtonClassKey } from '../Button/buttonClasses';

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
