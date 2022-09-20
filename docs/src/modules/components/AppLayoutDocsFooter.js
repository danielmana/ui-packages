import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Footer = styled('footer')(({ theme }) => {
  return {
    marginTop: theme.spacing(12),
  };
});

const PaginationDiv = styled('div')(({ theme }) => {
  return {
    margin: theme.spacing(3, 0, 4),
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  };
});

const PageLinkButton = styled(Button)(({ theme }) => {
  return {
    textTransform: 'none',
    fontWeight: 500,
    color: theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[500],
  };
});

/**
 * @typedef {import('docs/src/pages').MuiPage} MuiPage
 * @typedef {import('docs/src/pages').OrderedMuiPage} OrderedMuiPage
 */

/**
 * @param {MuiPage[]} pages
 * @param {MuiPage[]} [current]
 * @returns {OrderedMuiPage[]}
 */
function orderedPages(pages, current = []) {
  return pages
    .reduce((items, item) => {
      if (item.children && item.children.length > 1) {
        items = orderedPages(item.children, items);
      } else {
        items.push(item.children && item.children.length === 1 ? item.children[0] : item);
      }
      return items;
    }, current)
    .filter((page) => {
      return (
        page.inSideNav !== false &&
        // ignore external pages
        page.pathname.startsWith('/')
      );
    });
}

/**
 * @returns { { prevPage: OrderedMuiPage | null; nextPage: OrderedMuiPage | null } }
 */
function usePageNeighbours() {
  const { activePage, pages } = React.useContext(PageContext);
  const pageList = orderedPages(pages);
  const currentPageNum = pageList.indexOf(activePage);

  if (currentPageNum === -1) {
    return { prevPage: null, nextPage: null };
  }

  const prevPage = pageList[currentPageNum - 1] ?? null;
  const nextPage = pageList[currentPageNum + 1] ?? null;

  return { prevPage, nextPage };
}

export default function AppLayoutDocsFooter() {
  const t = useTranslate();
  const { activePage } = React.useContext(PageContext);

  const { nextPage, prevPage } = usePageNeighbours();

  const hidePagePagination = activePage === null || activePage.ordered === false;

  return (
    <Footer>
      {hidePagePagination ? null : (
        <React.Fragment>
          <Divider />
          <PaginationDiv>
            {prevPage !== null ? (
              <PageLinkButton
                component={Link}
                noLinkStyle
                href={prevPage.pathname}
                {...prevPage.linkProps}
                size="medium"
                startIcon={<ChevronLeftIcon />}
              >
                {pageToTitleI18n(prevPage, t)}
              </PageLinkButton>
            ) : (
              <div />
            )}
            {nextPage !== null ? (
              <PageLinkButton
                component={Link}
                noLinkStyle
                href={nextPage.pathname}
                {...nextPage.linkProps}
                size="medium"
                endIcon={<ChevronRightIcon />}
              >
                {pageToTitleI18n(nextPage, t)}
              </PageLinkButton>
            ) : null}
          </PaginationDiv>
        </React.Fragment>
      )}
    </Footer>
  );
}
