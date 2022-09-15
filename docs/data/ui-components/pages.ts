import pagesApi from './pagesApi';

const pages = [
  {
    pathname: '/ui-components/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/ui-components/getting-started/overview' },
      { pathname: '/ui-components/getting-started/installation' },
      { pathname: '/ui-components/getting-started/usage' },
    ],
  },
  {
    pathname: '/ui-components/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/ui-components/components/enhanced',
        subheader: 'Enhanced',
        children: [{ pathname: '/ui-components/react-my-component' }],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/ui-components/api',
    icon: 'CodeIcon',
    children: pagesApi,
  },
  {
    pathname: '/ui-components/customization',
    icon: 'CreateIcon',
    children: [{ pathname: '/ui-components/customization/color' }],
  },
];

export default pages;
