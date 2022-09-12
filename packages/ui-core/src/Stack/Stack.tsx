import clsx from 'clsx';
import PropTypes from 'prop-types';

import * as React from 'react';

import composeClasses from '@mui/base/composeClasses';
import MuiStack, { StackProps as MuiStackProps } from '@mui/material/Stack';
import { styled, useThemeProps } from '@mui/material/styles';
import { rootShouldForwardProp } from '@mui/material/styles/styled';

import { getStackUtilityClass } from './stackClasses';
import { StackProps } from './StackProps';

const useUtilityClasses = (ownerState: StackProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  const composedClasses = composeClasses(slots, getStackUtilityClass, classes);
  return { ...classes, ...composedClasses };
};

const StackRoot = styled(MuiStack, {
  shouldForwardProp: (prop: string) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'UICoreStack',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})<{ ownerState: StackProps }>(() => ({}));
/**
 *
 * Demos:
 *
 * - [Stack](https://verdant-klepon-5d2a5e.netlify.app//ui-core/react-stack/)
 *
 * API:
 *
 * - [Stack API](https://verdant-klepon-5d2a5e.netlify.app//ui-core/api/stack/)
 */
const Stack = React.forwardRef(function Stack(inProps: StackProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'UICoreStack',
  });

  const { children, className, ...other } = props;

  const ownerState = { ...props };

  const { root: classesRoot, ...classes } = useUtilityClasses(ownerState);

  return (
    <StackRoot
      ref={ref}
      classes={classes}
      className={clsx(classesRoot, className)}
      ownerState={ownerState}
      {...(other as MuiStackProps)}
    >
      {children}
    </StackRoot>
  );
});

Stack.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit "StackProps.ts" and run "yarn proptypes"
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
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
    PropTypes.object,
  ]),
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Stack;
