import React from 'react';

import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
import { styled } from '@mui/material/styles';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { capitalize } from '@mui/material/utils';

type ColorExt = MuiButtonProps['color'] | 'tertiary';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="text"` and `color="tertiary"`. */
  textTertiary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="tertiary"`. */
  outlinedTertiary: string;
  /** Styles applied to the root element if `variant="contained"` and `color="tertiary"`. */
  containedTertiary: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('ExtButton', slot);
}

export const buttonExtClasses: ButtonClasses = generateUtilityClasses('ExtButton', [
  'root',
  'textTertiary',
  'outlinedTertiary',
  'containedTertiary',
]);

export interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color?: ColorExt;
}

interface StyledProps {
  ownerState: ButtonProps;
}

const StyledRoot = styled(MuiButton, {
  // Configure which props should be forwarded
  shouldForwardProp: (prop) => prop !== 'ownerState',
  name: 'ExtButton',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: ({ ownerState }: StyledProps, styles) => [
    styles.root,
    ownerState.color === 'tertiary' &&
      styles[`${ownerState.variant}${capitalize(ownerState.color)}`],
  ],
})<StyledProps>();

const Button: React.FC<ButtonProps> = ({ color, ...props }: ButtonProps) => {
  const ownerState = {
    ...props,
    color,
  };
  return (
    <StyledRoot
      ownerState={ownerState}
      color={color === 'tertiary' ? 'primary' : color}
      {...props}
    />
  );
};

export default Button;
