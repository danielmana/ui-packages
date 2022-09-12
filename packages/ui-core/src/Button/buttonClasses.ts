import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('UICoreButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('UICoreButton', ['root']);

export default buttonClasses;
