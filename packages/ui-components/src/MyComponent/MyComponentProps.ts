import { StepperProps } from '@danielmana/ui-core';

export interface MyComponentProps extends Omit<StepperProps, 'classes'> {
  /**
   * foo field, blah blah
   */
  foo?: boolean;
}
