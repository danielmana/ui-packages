import React from 'react';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends Omit<MuiButtonProps, 'classes' | 'className'> {
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color?: MuiButtonProps['color'] | 'tertiary';
}
/**
 *
 * Demos:
 *
 * - [Button](https://mui.com/ui-core/button/)
 *
 * API:
 *
 * - [Button API](https://mui.com/ui-core/api/button/)
 * - inherits [Button API](https://mui.com/material-ui/api/button/)
 */
const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <MuiButton {...props} />;
};

export default Button;
