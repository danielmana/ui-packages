import copy from 'clipboard-copy';
import Link from 'docs/src/modules/components/Link';
import * as React from 'react';

import CheckRounded from '@mui/icons-material/CheckRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function GetStartedButtons({
  label,
  installation,
  to,
  disabled,
  ...props
}: { label: string; installation: string; to: string; disabled?: boolean } & BoxProps) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    setCopied(true);
    copy(installation).then(() => {
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '&& > *': { minWidth: 'clamp(0px, (492px - 100%) * 999 ,100%)' },
        ...props.sx,
      }}
    >
      <Button
        href={to}
        component={Link}
        noLinkStyle
        size="large"
        variant="contained"
        endIcon={<KeyboardArrowRightRounded />}
        sx={{ mr: { xs: 0, sm: 2 } }}
        disabled={disabled}
      >
        {label}
      </Button>
      <Box sx={{ py: 1, display: { xs: 'block', sm: 'hidden' } }} />
      <Button
        size="large"
        // @ts-expect-error
        variant="code"
        endIcon={copied ? <CheckRounded color="primary" /> : <ContentCopyRounded />}
        onClick={handleCopy}
        disabled={disabled}
        sx={{
          maxWidth: '324px',
          display: 'inline-block',
          justifyContent: 'start',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          position: 'relative',
          pr: 5,
        }}
      >
        {installation}
      </Button>
    </Box>
  );
}
