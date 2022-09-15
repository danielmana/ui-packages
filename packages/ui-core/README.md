# @danielmana/ui-core

UI Core is a library of designed React UI components build in the top of Material UI

It features foundational components such as the ones you'd find in Material UI and it comes with a beautifully designed default theme. It comes with a lot of customization features so you match it to your desired look and feel.

## TypeScript convention

> **Public components** are considered all components exported from `@danielmana/ui-core` or `@danielmana/ui-components`.
>
> **Internal components** are considered all components that are not exported from the packages, but only used in some public component.

### `Props Interface`

- export interface `{ComponentName}Classes` from `{componentName}Classes.ts` and add comment for generating api docs (for internal components, may or may not expose classes but don't need comment)
- export interface `{ComponentName}Props` from `{ComponentName}Props.ts`
- always export props interface (use `interface` over `type`) from the component file
- use the `UICore{Component}` prefix for the utility classes name

<summary>Public component</summary>

```ts
// fooClasses.tsx

export interface FooClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the foo element. */
  foo: string;
  /** Styles applied to the root element if `disabled=true`. */
  disabled: string;
}

const fooClasses: FooClasses = generateUtilityClasses('UICoreFoo', ['root', 'foo', 'disabled']);

export default fooClasses;
```

```ts
// Foo.tsx
import { FooClasses } from './fooClasses';

export interface FooProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FooClasses>;
  // ...other props
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}
```

<summary>internal component</summary>

```ts
// Bar.tsx

// if this internal component can accept classes as prop
export interface BarClasses {
  root: string;
}

export interface BarProps {
  classes?: Partial<BarClasses>;
  sx?: SxProps<Theme>;
}
```

### `ClassKey`

- naming as `{ComponentName}ClassKey`
- export if `classes` exists in props interface using `keyof` from `{component}Classes.ts`

```ts
// fooClasses.ts
export interface FooClasses {
  ...
}

export type FooClassKey = keyof FooClasses;
// verify that FooClassKey is union of string literal
```

### `Classes generator & Utility`

- export if `classes` exists in props interface from the component file
- use `{Component}Classes` as type to preventing typo and missing classes
- use `Private` prefix for internal component

```ts
// fooClasses.ts
export function getFooUtilityClass(slot: string) {
  return generateUtilityClass('UICoreFoo', slot);
}

const useUtilityClasses = (ownerState: FooProps & { extraProp: boolean }) => {
  // extraProp might be the key/value from react context that this component access
  const { foo, disabled, classes } = ownerState;

  const slots = {
    root: ['root', foo && 'foo', disabled && 'disabled'],
  };

  return composeClasses(slots, getFooUtilityClass, classes);
};
```

<summary>internal component</summary>

```ts
// Bar.tsx
// in case that classes is not exposed.
// `classes` is used internally in this component
const classes = generateUtilityClasses('PrivateBar', ['root', 'bar']);
```

### `StyledComponent`

- naming using slot `{ComponentName}{Slot}`
- to extend interface of the styled component, pass argument to generic

<summary>public component</summary>

```ts
const FooRoot = styled(Typography, {
  name: 'UICoreFoo',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  // styling
});
```

<summary>internal component</summary>

```ts
const BarRoot = styled(Typography)({
  // styling
});
```

<summary>extends interface</summary>

```ts
const BarRoot = styled(Typography)<{
  component?: React.ElementType;
  ownerState: BarProps;
}>(({ theme, ownerState }) => ({
  // styling
}));
// passing `component` to BarRoot is safe and we don't forget to pass ownerState
// <BarRoot component="span" ownerState={ownerState} />
```

### `Component declaration`

- prefer `function Component() {}` over `React.FC`
- naming the render function in `React.forwardRef` (for devtools)
- `useThemeProps` is needed only for public component
- pass `ownerState` to StyledComponent for styling

<summary>public component</summary>

```ts
const Foo = React.forwardRef<HTMLSpanElement, FooProps>(function Foo(inProps, ref) {
  // pass args like this, otherwise will get error about theme at return section
  const props = useThemeProps<Theme, FooProps, 'UICoreFoo'>({
    props: inProps,
    name: 'UICoreFoo',
  });
  const { children, className, ...other } = props;

  // ...implementation

  const ownerState = { ...props, ...otherValue };

  const { root: classesRoot, ...classes } = useUtilityClasses(ownerState);

  return (
    <FooRoot
      ref={ref}
      classes={classes}
      className={clsx(classesRoot, className)}
      ownerState={ownerState}
      {...other}
      // Cast the type in case there's props override.
      // E.g. <Button component="a" ... /> has different props bc of the overrides
      // {...(other as RootProps)}
    >
      {children}
    </FooRoot>
  );
});
```

<summary>internal component</summary>

```ts
const classes = generateUtilityClasses('PrivateBar', ['selected']);

const BarRoot = styled('div')(({ theme }) => ({
  [`&.${classes.selected}`]: {
    color: theme.palette.text.primary,
  },
}));

// if this component does not need React.forwardRef, don't use React.FC
const Bar = (props: BarProps) => {
  const { className, selected, ...other } = props;
  return <BarRoot className={clsx({ [classes.selected]: selected })} {...other} />;
};
```
