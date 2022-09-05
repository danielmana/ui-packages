import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { ExtendButton as MuiExtendButton } from '@mui/material/Button';
import { OverridableTypeMap, OverrideProps } from '@mui/material/OverridableComponent';

export interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */
    color?:
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'success'
      | 'error'
      | 'info'
      | 'warning';
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     * @default false
     */
    disableElevation?: boolean;
    /**
     * If `true`, the  keyboard focus ripple is disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * Element placed after the children.
     */
    endIcon?: React.ReactNode;
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href?: string;
    /**
     * The size of the component.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Element placed before the children.
     */
    startIcon?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The variant to use.
     * @default 'text'
     */
    variant?: 'text' | 'outlined' | 'contained';
  };
  defaultComponent: D;
}

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ButtonTypeMap<P, D>, D>;

export type ExtendButton<M extends OverridableTypeMap> = MuiExtendButton<M> & { propTypes?: any };
