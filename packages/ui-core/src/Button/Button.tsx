import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

import composeClasses from '@mui/base/composeClasses';
import MuiButton from '@mui/material/Button';
import { styled, Theme, useThemeProps } from '@mui/material/styles';
import { capitalize } from '@mui/material/utils';

import { getButtonUtilityClass } from './buttonClasses';
import { ButtonProps, ButtonTypeMap, ExtendButton } from './ButtonProps';

const useUtilityClasses = (ownerState: ButtonProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return { ...classes, ...composedClasses };
};

const ButtonRoot = styled(MuiButton, {
  name: 'UICoreButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { color, variant = 'text' } = props.ownerState as ButtonProps;

    return [styles.root, color && styles[`${variant || 'text'}${capitalize(color)}`]];
  },
})<{ ownerState: ButtonProps }>(() => ({}));

/**
 *
 * Demos:
 *
 * - [Button](https://verdant-klepon-5d2a5e.netlify.app//ui-core/react-button/)
 *
 * API:
 *
 * - [Button API](https://verdant-klepon-5d2a5e.netlify.app//ui-core/api/button/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps<Theme, ButtonProps, 'UICoreButton'>({
    props: inProps,
    name: 'UICoreButton',
  });

  const { children, className, ...other } = props;

  const ownerState = { ...props };

  const { root: classesRoot, ...classes } = useUtilityClasses(ownerState);

  return (
    <ButtonRoot
      ref={ref}
      classes={classes}
      className={clsx(classesRoot, className)}
      ownerState={ownerState}
      {...other}
    >
      {children}
    </ButtonRoot>
  );
}) as ExtendButton<ButtonTypeMap>;

Button.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit "ButtonProps.ts" and run "yarn proptypes"
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * @default 'primary'
   */
  color: PropTypes.oneOf([
    'error',
    'info',
    'inherit',
    'primary',
    'secondary',
    'success',
    'tertiary',
    'warning',
  ]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
} as any;

export default Button;
