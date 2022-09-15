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
        pathname: '/ui-core/components/enhanced',
        subheader: 'Enhanced',
        children: [{ pathname: '/ui-core/react-button' }],
      },
      {
        pathname: '/ui-core/components/other',
        subheader: 'Other',
        children: [{ pathname: '/ui-core/other-mui-components', title: 'MUI components' }],
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
    pathname: '/ui-core/customization',
    icon: 'CreateIcon',
    children: [{ pathname: '/ui-core/customization/color' }],
  },
];

export default pages;
