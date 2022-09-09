import pagesApi from './pagesApi';

const pages = [
  {
    pathname: '/ui-core/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/ui-core/getting-started/overview' },
      { pathname: '/ui-core/getting-started/installation' },
      { pathname: '/ui-core/getting-started/usage' },
      { pathname: '/ui-core/getting-started/supported-platforms' },
    ],
  },
  {
    pathname: '/ui-core/react-',
    scopePathnames: [
      '/ui-core/icons',
      '/ui-core/material-icons',
      '/ui-core/about-the-lab',
      '/ui-core/transitions',
    ],
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/ui-core/components/inputs',
        subheader: 'inputs',
        children: [{ pathname: '/ui-core/react-button' }],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/ui-core/api',
    icon: 'CodeIcon',
    children: pagesApi,
  },
  {
    pathname: '/material-ui/customization',
    icon: 'CreateIcon',
    children: [
      {
        pathname: '/material-ui/customization',
        subheader: '/material-ui/customization/theme',
        children: [
          { pathname: '/material-ui/customization/theming' },
          { pathname: '/material-ui/customization/palette' },
          { pathname: '/material-ui/customization/dark-mode', title: 'Dark mode' },
          { pathname: '/material-ui/customization/typography' },
          { pathname: '/material-ui/customization/spacing' },
          { pathname: '/material-ui/customization/breakpoints' },
          { pathname: '/material-ui/customization/density' },
          { pathname: '/material-ui/customization/z-index', title: 'z-index' },
          { pathname: '/material-ui/customization/transitions' },
          { pathname: '/material-ui/customization/theme-components', title: 'Components' },
          { pathname: '/material-ui/customization/default-theme', title: 'Default Theme' },
        ],
      },
      { pathname: '/material-ui/customization/how-to-customize' },
      { pathname: '/material-ui/customization/color' },
    ],
  },
  {
    pathname: '/material-ui/guides',
    title: 'How To Guides',
    icon: 'VisibilityIcon',
    children: [
      { pathname: '/material-ui/guides/api', title: 'API design approach' },
      { pathname: '/material-ui/guides/understand-mui-packages', title: 'Understand MUI packages' },
      { pathname: '/material-ui/guides/typescript', title: 'TypeScript' },
      { pathname: '/material-ui/guides/interoperability', title: 'Style library interoperability' },
      { pathname: '/material-ui/guides/styled-engine' },
      { pathname: '/material-ui/guides/minimizing-bundle-size' },
      { pathname: '/material-ui/guides/composition' },
      { pathname: '/material-ui/guides/routing' },
      { pathname: '/material-ui/guides/server-rendering' },
      { pathname: '/material-ui/guides/responsive-ui', title: 'Responsive UI' },
      {
        pathname: '/material-ui/guides/pickers-migration',
        title: 'Migration from @material-ui/pickers',
      },
      { pathname: '/material-ui/guides/testing' },
      { pathname: '/material-ui/guides/localization' },
      { pathname: '/material-ui/guides/content-security-policy', title: 'Content Security Policy' },
      { pathname: '/material-ui/guides/right-to-left', title: 'Right-to-left' },
      { pathname: '/material-ui/guides/flow' },
      { pathname: '/material-ui/guides/shadow-dom', title: 'Shadow DOM' },
    ],
  },
];

export default pages;
