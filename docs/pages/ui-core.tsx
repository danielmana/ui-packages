import pages from 'docs/data/ui-core/pages';
import BrandingProvider from 'docs/src/BrandingProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import Section from 'docs/src/layouts/Section';
import Head from 'docs/src/modules/components/Head';
import Link from 'docs/src/modules/components/Link';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { MuiPage } from 'docs/src/pages';
import * as React from 'react';

import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

export default function Components() {
  const t = useTranslate();
  const componentPageData = pages.find(({ title }) => title === 'Components');
  if (!componentPageData) {
    throw new Error('There should be a list of components for docsearch indexing');
  }
  function renderItem(aPage: MuiPage) {
    return (
      <ListItem key={aPage.pathname} disablePadding>
        <ListItemButton
          component={Link}
          noLinkStyle
          href={aPage.pathname}
          sx={{
            px: 1,
            py: 0.5,
            fontSize: '0.84375rem',
            fontWeight: 500,
            '&:hover, &:focus': { '& svg': { opacity: 1 } },
          }}
        >
          {pageToTitleI18n(aPage, t) || ''}
          <KeyboardArrowRightRounded
            sx={{
              ml: 'auto',
              fontSize: '1.125rem',
              opacity: 0,
              color: 'primary.main',
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  }
  return (
    <BrandingProvider>
      <Head
        title="Packages - UI Core"
        description="Simple, customizable, and accessible library of React components."
      />
      <AppHeader />
      <main id="main-content">
        <Section bg="gradient" sx={{ py: { xs: 2, sm: 4 } }}>
          <Typography component="h1" variant="h2" sx={{ mb: 4, pl: 1 }}>
            UI Core Components
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
          >
            {(componentPageData?.children || []).map((page: MuiPage) => (
              <Box key={page.pathname} sx={{ pb: 2 }}>
                <Typography
                  component="h2"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: 'grey.600',
                    px: 1,
                  }}
                >
                  {pageToTitleI18n(page, t)}
                </Typography>
                <List>
                  {!page.children?.length && renderItem(page)}
                  {(page.children || []).map((nestedPage) => {
                    if (nestedPage.children) {
                      return (
                        <ListItem key={nestedPage.pathname} sx={{ py: 0, px: 1 }}>
                          <Box sx={{ width: '100%', pt: 1 }}>
                            <Typography
                              component="div"
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                color: 'grey.600',
                              }}
                            >
                              {pageToTitleI18n(nestedPage, t) || ''}
                            </Typography>
                            <List>{nestedPage.children.map(renderItem)}</List>
                          </Box>
                        </ListItem>
                      );
                    }
                    return renderItem(nestedPage);
                  })}
                </List>
              </Box>
            ))}
          </Box>
        </Section>
      </main>
    </BrandingProvider>
  );
}
