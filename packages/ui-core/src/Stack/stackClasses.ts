import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface StackClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type StackClassKey = keyof StackClasses;

export function getStackUtilityClass(slot: string): string {
  return generateUtilityClass('UICoreStack', slot);
}

const stackClasses: StackClasses = generateUtilityClasses('UICoreStack', ['root']);

export default stackClasses;
