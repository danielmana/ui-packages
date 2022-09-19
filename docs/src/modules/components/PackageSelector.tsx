import IconImage from 'docs/src/components/icon/IconImage';
import Link from 'docs/src/modules/components/Link';
import useRouterExtra from 'docs/src/modules/utils/useRouterExtra';
import ROUTES from 'docs/src/route';
import * as React from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface ProductSubMenuProp extends BoxProps {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  chip?: React.ReactNode;
}

function ProductSubMenu(props: ProductSubMenuProp) {
  const { icon, name, description, chip, sx = [], ...other } = props;
  return (
    <Box
      {...other}
      sx={[
        {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          '& circle': {
            fill: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography color="text.primary" variant="body2" fontWeight="700">
          {name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </Box>
      {chip}
    </Box>
  );
}

export default function PackageSelector() {
  const routerExtra = useRouterExtra();

  return (
    <React.Fragment>
      <Box
        component="li"
        role="none"
        sx={{
          p: 2,
          pr: 3,
          borderBottom: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary[100], 0.08)
              : theme.palette.grey[100],
        }}
      >
        <ProductSubMenu
          role="menuitem"
          icon={<IconImage name="product-core" />}
          name="Core"
          description="Ready-to-use foundational components."
        />
        <Box sx={{ ml: '36px', pl: 2, pt: 1.5, position: 'relative' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="flex-start"
            spacing={1}
            sx={{
              '& > .MuiChip-root': {
                position: 'initial',
                '&:hover': {
                  '& .product-description': {
                    opacity: 1,
                  },
                },
              },
            }}
          >
            {[
              {
                name: 'ui-core',
                href: ROUTES.uiCoreDocs,
                slug: 'ui-core',
              },
              {
                name: 'ui-icons',
                href: ROUTES.uiCoreDocs,
                slug: 'ui-icons',
              },
              {
                name: 'ui-utils',
                href: ROUTES.uiCoreDocs,
                slug: 'ui-utils',
              },
            ].map((product) => (
              <Chip
                key={product.name}
                color={routerExtra.product === product.slug ? 'default' : undefined}
                variant={routerExtra.product === product.slug ? 'filled' : 'outlined'}
                component={Link}
                href={product.href}
                label={product.name}
                clickable
                size="small"
              />
            ))}
          </Stack>
        </Box>
      </Box>
      <Box
        component="li"
        role="none"
        sx={{
          p: 2,
          pr: 3,
          borderBottom: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary[100], 0.08)
              : theme.palette.grey[100],
        }}
      >
        <ProductSubMenu
          role="menuitem"
          icon={<IconImage name="product-advanced" />}
          name="Components"
          description="Advanced components for complex use cases."
        />
        <Box sx={{ ml: '36px', pl: 2, pt: 1.5, position: 'relative' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="flex-start"
            spacing={1}
            sx={{
              '& > .MuiChip-root': {
                position: 'initial',
                '&:hover': {
                  '& .product-description': {
                    opacity: 1,
                  },
                },
              },
            }}
          >
            {[
              {
                name: 'ui-components',
                href: ROUTES.uiComponentsDocs,
                slug: 'ui-components',
              },
              {
                name: 'ui-forms',
                href: ROUTES.uiCoreDocs,
                slug: 'ui-forms',
              },
            ].map((product) => (
              <Chip
                key={product.name}
                color={routerExtra.product === product.slug ? 'default' : undefined}
                variant={routerExtra.product === product.slug ? 'filled' : 'outlined'}
                component={Link}
                href={product.href}
                label={product.name}
                clickable
                size="small"
              />
            ))}
          </Stack>
        </Box>
      </Box>
      <Box
        component="li"
        role="none"
        sx={{
          p: 2,
          pr: 3,
          borderBottom: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary[100], 0.08)
              : theme.palette.grey[100],
        }}
      >
        <ProductSubMenu
          role="menuitem"
          icon={<IconImage name="product-toolpad" />}
          name="Model"
          description="Connect the frontent with the backend."
        />
        <Box sx={{ ml: '36px', pl: 2, pt: 1.5, position: 'relative' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="flex-start"
            spacing={1}
            sx={{
              '& > .MuiChip-root': {
                position: 'initial',
                '&:hover': {
                  '& .product-description': {
                    opacity: 1,
                  },
                },
              },
            }}
          >
            {[
              {
                name: 'ui-model',
                href: ROUTES.uiCoreDocs,
                slug: 'ui-model',
              },
              {
                name: 'ui-model-legacy',
                href: ROUTES.uiCoreDocs,
                slug: 'ui-model-legacy',
              },
            ].map((product) => (
              <Chip
                key={product.name}
                color={routerExtra.product === product.slug ? 'default' : undefined}
                variant={routerExtra.product === product.slug ? 'filled' : 'outlined'}
                component={Link}
                href={product.href}
                label={product.name}
                clickable
                size="small"
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}
