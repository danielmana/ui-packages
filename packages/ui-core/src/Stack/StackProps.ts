import React from 'react';

import { OverrideProps } from '@mui/material/OverridableComponent';
import { SxProps, Theme } from '@mui/material/styles';
import { ResponsiveStyleValue, SystemProps } from '@mui/system';

export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps<Theme> & {
      ref?: React.Ref<unknown>;
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'column'
       */
      direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
      /**
       * Defines the space between immediate children.
       * @default 0
       */
      spacing?: ResponsiveStyleValue<number | string>;
      /**
       * Add an element between each child.
       */
      divider?: React.ReactNode;
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<StackTypeMap<P, D>, D>;
