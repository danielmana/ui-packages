import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { exactProp } from '@mui/utils';
import GlobalStyles from '@mui/material/GlobalStyles';
import NoSsr from '@mui/material/NoSsr';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import AppLayoutDocsFooter from 'docs/src/modules/components/AppLayoutDocsFooter';
import BackToTop from 'docs/src/modules/components/BackToTop';

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'disableToc',
})(({ disableToc, theme }) => ({
  display: 'flex',
  width: '100%',
  ...(disableToc && {
    [theme.breakpoints.up('lg')]: {
      marginRight: '5%',
    },
  }),
  [theme.breakpoints.up('lg')]: {
    width: 'calc(100% - var(--MuiDocs-navDrawer-width))',
  },
}));

const StyledAppContainer = styled(AppContainer, {
  shouldForwardProp: (prop) => prop !== 'disableToc',
})(({ disableToc, theme }) => {
  return {
    position: 'relative',
    ...(!disableToc && {
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100% - var(--MuiDocs-toc-width))',
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '60px',
        paddingRight: '60px',
      },
    }),
  };
});

const ActionsDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: -10,
  marginBottom: -15,
  [theme.breakpoints.up('lg')]: {
    justifyContent: 'flex-end',
  },
}));

function AppLayoutDocs(props) {
  const router = useRouter();
  const { children, description, disableToc = false, location, title, toc } = props;

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  const { canonicalAs } = pathnameToLanguage(router.asPath);
  let productName = 'UI';
  if (canonicalAs.startsWith('/ui-core')) {
    productName = 'ui-core';
  } else if (canonicalAs.startsWith('/ui-components')) {
    productName = 'ui-components';
  } else if (canonicalAs.startsWith('/ui-icons')) {
    productName = 'ui-icons';
  } else if (canonicalAs.startsWith('/ui-utils')) {
    productName = 'ui-utils';
  } else if (canonicalAs.startsWith('/ui-forms')) {
    productName = 'ui-forms';
  } else if (canonicalAs.startsWith('/ui-widgets')) {
    productName = 'ui-widgets';
  } else if (canonicalAs.startsWith('/ui-model-legacy')) {
    productName = 'ui-model-legacy';
  } else if (canonicalAs.startsWith('/ui-model')) {
    productName = 'ui-model';
  }

  return (
    <AppFrame>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-navDrawer-width': '300px',
            '--MuiDocs-toc-width': '240px',
          },
        }}
      />
      <Head title={`${title} - ${productName}`} description={description} />
      <Main disableToc={disableToc}>
        {/*
            Render the TOCs first to avoid layout shift when the HTML is streamed.
            See https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/ for more details.
          */}
        {disableToc ? null : <AppTableOfContents toc={toc} />}
        <StyledAppContainer disableToc={disableToc}>
          <ActionsDiv>{location && <EditPage markdownLocation={location} />}</ActionsDiv>
          {children}
          <NoSsr>
            <AppLayoutDocsFooter />
          </NoSsr>
        </StyledAppContainer>
      </Main>
      <BackToTop />
    </AppFrame>
  );
}

AppLayoutDocs.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  disableToc: PropTypes.bool.isRequired,
  location: PropTypes.string,
  title: PropTypes.string.isRequired,
  toc: PropTypes.array.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  AppLayoutDocs.propTypes = exactProp(AppLayoutDocs.propTypes);
}

export default AppLayoutDocs;
