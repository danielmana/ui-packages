import * as React from 'react';
import PropTypes from 'prop-types';

import { Stepper } from '@danielmana/ui-core';
import { MyComponentProps } from './MyComponentProps';
/**
 *
 * Demos:
 *
 * - [MyComponent](https://verdant-klepon-5d2a5e.netlify.app//ui-components/react-my-component/)
 *
 * API:
 *
 * - [MyComponent API](https://verdant-klepon-5d2a5e.netlify.app//ui-components/api/my-component/)
 * - inherits [Stepper API](https://mui.com/material-ui/api/stepper/)
 */
function MyComponent({ foo, ...rest }: MyComponentProps) {
  return <Stepper {...rest} />;
}

MyComponent.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit "MyComponentProps.ts" and run "yarn proptypes"
  // ----------------------------------------------------------------------
  /**
   * Two or more `<Step />` components.
   */
  children: PropTypes.node,
  /**
   * foo field, blah blah
   */
  foo: PropTypes.bool,
} as any;

export default MyComponent;
