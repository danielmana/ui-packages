import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import { useTheme } from '@mui/material/styles';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function EditPage(props) {
  const theme = useTheme();
  const { markdownLocation } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();

  return (
    <Button
      component="a"
      href={`https://github.com/danielmana/ui-packages/blob/master${markdownLocation}`}
      target="_blank"
      rel="noopener nofollow"
      size="small"
      endIcon={<EditRoundedIcon />}
      data-ga-event-category={userLanguage === 'en' ? undefined : 'l10n'}
      data-ga-event-action={userLanguage === 'en' ? undefined : 'edit-button'}
      data-ga-event-label={userLanguage === 'en' ? undefined : userLanguage}
      sx={{
        ml: { md: -1, lg: 0 },
        mb: 2,
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(12.5),
        color:
          theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
        '& svg': {
          width: 14,
          height: 14,
        },
      }}
    >
      {t('editPage')}
    </Button>
  );
}

EditPage.propTypes = {
  markdownLocation: PropTypes.string.isRequired,
};
