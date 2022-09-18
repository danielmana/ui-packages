import * as React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
// import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import IconImage from 'docs/src/components/icon/IconImage';
// import DiamondSponsors from 'docs/src/modules/components/DiamondSponsors';
import AppNavDrawerItem from 'docs/src/modules/components/AppNavDrawerItem';
import { pathnameToLanguage, pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import MuiProductSelector from 'docs/src/modules/components/MuiProductSelector';
import uiCorePkgJson from '../../../../packages/ui-core/package.json';
import uiComponentsPkgJson from '../../../../packages/ui-components/package.json';

const savedScrollTop = {};

function ProductDrawerButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        id="mui-product-selector"
        aria-controls="drawer-open-button"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownRoundedIcon fontSize="small" sx={{ ml: -0.5 }} />}
        sx={(theme) => ({
          py: 0.1,
          minWidth: 0,
          fontSize: theme.typography.pxToRem(13),
          fontWeight: theme.typography.fontWeightMedium,
          color:
            theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
          '& svg': {
            ml: -0.6,
            width: 18,
            height: 18,
          },
          '& > span': {
            ml: '4px',
          },
        })}
      >
        {props.productName}
      </Button>
      <Menu
        id="mui-product-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'mui-product-selector',
        }}
        PaperProps={{
          sx: {
            width: { xs: 340, sm: 'auto' },
          },
        }}
      >
        <MuiProductSelector />
      </Menu>
    </React.Fragment>
  );
}

ProductDrawerButton.propTypes = {
  productName: PropTypes.string,
};

const ProductIdentifier = ({ name, metadata, versionSelector }) => (
  <Box sx={{ flexGrow: 1 }}>
    <Typography
      sx={(theme) => ({
        ml: 1,
        color: theme.palette.grey[600],
        fontSize: theme.typography.pxToRem(11),
        fontWeight: 700,
        // textTransform: 'uppercase',
        letterSpacing: '.08rem',
      })}
    >
      {metadata}
    </Typography>
    <Box sx={{ display: 'flex' }}>
      <ProductDrawerButton productName={name} />
      {versionSelector}
    </Box>
  </Box>
);

ProductIdentifier.propTypes = {
  metadata: PropTypes.string,
  name: PropTypes.string,
  versionSelector: PropTypes.element,
};

function PersistScroll(props) {
  const { slot, children, enabled } = props;
  const rootRef = React.useRef();

  useEnhancedEffect(() => {
    const parent = rootRef.current ? rootRef.current.parentElement : null;
    const activeElement = parent.querySelector('.app-drawer-active');

    if (!enabled || !parent || !activeElement || !activeElement.scrollIntoView) {
      return undefined;
    }

    parent.scrollTop = savedScrollTop[slot];

    const activeBox = activeElement.getBoundingClientRect();

    if (activeBox.top < 0 || activeBox.top > window.innerHeight) {
      parent.scrollTop += activeBox.top - 8 - 32;
    }

    return () => {
      savedScrollTop[slot] = parent.scrollTop;
    };
  }, [enabled, slot]);

  return <div ref={rootRef}>{children}</div>;
}

PersistScroll.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  slot: PropTypes.string.isRequired,
};

const ToolbarDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.45, 2),
  paddingRight: 0,
  height: 'var(--MuiDocs-header-height)',
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

const AppNavPaperComponent = styled('div')(({ theme }) => {
  return {
    width: 'var(--MuiDocs-navDrawer-width)',
    boxShadow: 'none',
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('xs')]: {
      borderRadius: '0px 10px 10px 0px',
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: '0px',
    },
  };
});

function renderNavItems(options) {
  const { pages, ...params } = options;

  return (
    <List sx={{ my: 0.5 }}>
      {pages.reduce(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        [],
      )}
    </List>
  );
}

/**
 * @param {object} context
 * @param {import('docs/src/pages').MuiPage} context.page
 */
function reduceChildRoutes(context) {
  const { onClose, activePage, items, depth, t } = context;
  let { page } = context;
  if (page.inSideNav === false) {
    return items;
  }

  const title = pageToTitleI18n(page, t);

  if (page.children && page.children.length >= 1) {
    const topLevel = activePage
      ? activePage.pathname.indexOf(`${page.pathname}`) === 0 ||
        page.scopePathnames?.some((pathname) => activePage.pathname.includes(pathname))
      : false;
    let firstChild = page.children[0];

    if (firstChild.subheader && firstChild.children) {
      firstChild = firstChild.children[0];
    }

    const subheader = Boolean(page.subheader);

    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={firstChild.pathname}
        legacy={page.legacy}
        newFeature={page.newFeature}
        plan={page.plan}
        icon={page.icon}
        subheader={subheader}
        topLevel={topLevel && !page.subheader}
        openImmediately={topLevel || subheader}
      >
        {renderNavItems({
          onClose,
          pages: page.children,
          activePage,
          depth: subheader ? depth : depth + 1,
          t,
        })}
      </AppNavDrawerItem>,
    );
  } else {
    page = page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        legacy={page.legacy}
        newFeature={page.newFeature}
        plan={page.plan}
        icon={page.icon}
        subheader={Boolean(page.subheader)}
        onClick={onClose}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function AppNavDrawer(props) {
  const { className, disablePermanent, mobileOpen, onClose, onOpen } = props;
  const { activePage, pages } = React.useContext(PageContext);
  const router = useRouter();
  const t = useTranslate();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const drawer = React.useMemo(() => {
    const { canonicalAs } = pathnameToLanguage(router.asPath);

    const navItems = renderNavItems({ onClose, pages, activePage, depth: 0, t });

    return (
      <React.Fragment>
        <ToolbarDiv>
          <NextLink href="/" passHref>
            <Box
              component="a"
              onClick={onClose}
              aria-label={t('goToHome')}
              sx={{
                pr: '12px',
                mr: '4px',
                borderRight: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primary[100], 0.08)
                    : theme.palette.grey[200],
              }}
            >
              <IconImage name="product-core" />
              {/* <SvgMuiLogo width={30} /> */}
            </Box>
          </NextLink>
          {canonicalAs.startsWith('/ui-core/') && (
            <ProductIdentifier name={`ui-core#${uiCorePkgJson.version}`} metadata="Core" />
          )}
          {canonicalAs.startsWith('/ui-components/') && (
            <ProductIdentifier
              name={`ui-components#${uiComponentsPkgJson.version}`}
              metadata="Components"
            />
          )}
          {canonicalAs.startsWith('/ui-icons/') && (
            <ProductIdentifier name="ui-icons" metadata="Core" />
          )}
          {canonicalAs.startsWith('/ui-utils/') && (
            <ProductIdentifier name="ui-utils" metadata="Core" />
          )}
          {canonicalAs.startsWith('/ui-forms/') && (
            <ProductIdentifier name="ui-forms" metadata="Core" />
          )}
          {canonicalAs.startsWith('/ui-widgets/') && (
            <ProductIdentifier name="ui-widgets" metadata="Components" />
          )}
          {canonicalAs.startsWith('/ui-model/') && (
            <ProductIdentifier name="ui-model" metadata="Model" />
          )}
          {canonicalAs.startsWith('/ui-model-legacy/') && (
            <ProductIdentifier name="ui-model-legacy" metadata="Model [Legacy]" />
          )}
        </ToolbarDiv>
        <Divider
          sx={{
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary[100], 0.08)
                : theme.palette.grey[100],
          }}
        />
        {/* <DiamondSponsors /> */}
        {navItems}
      </React.Fragment>
    );
  }, [activePage, pages, onClose, t, router.asPath]);

  return (
    <nav className={className} aria-label={t('mainNavigation')}>
      {disablePermanent || mobile ? (
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            className: 'algolia-drawer',
            component: AppNavPaperComponent,
          }}
        >
          <PersistScroll slot="swipeable" enabled={mobileOpen}>
            {drawer}
          </PersistScroll>
        </SwipeableDrawer>
      ) : null}
      {disablePermanent || mobile ? null : (
        <StyledDrawer
          variant="permanent"
          PaperProps={{
            component: AppNavPaperComponent,
          }}
          open
        >
          <PersistScroll slot="side" enabled>
            {drawer}
          </PersistScroll>
        </StyledDrawer>
      )}
    </nav>
  );
}

AppNavDrawer.propTypes = {
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
