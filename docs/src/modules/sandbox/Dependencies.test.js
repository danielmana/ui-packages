import { expect } from 'chai';
import SandboxDependencies from './Dependencies';

describe('Dependencies', () => {
  before(() => {
    process.env.SOURCE_CODE_REPO = 'https://github.com/mui/material-ui';
  });

  after(() => {
    delete process.env.SOURCE_CODE_REPO;
  });

  const s1 = `
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import SliderUnstyled from '@mui/base/SliderUnstyled';
import FooBar, { Qux } from '@foo-bar/bip';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formContro
`;

  it('should handle @ dependencies', () => {
    const { dependencies } = SandboxDependencies({
      raw: s1,
      codeVariant: 'JS',
    });
    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@foo-bar/bip': 'latest',
      '@mui/material': 'latest',
      '@mui/base': 'latest',
      'prop-types': 'latest',
    });
  });

  it('should handle * dependencies', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import * as _ from '@unexisting/thing';
import Draggable from 'react-draggable';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from '@mui/material/styles';
const suggestions = [
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'latest',
      '@unexisting/thing': 'latest',
      'autosuggest-highlight': 'latest',
      'prop-types': 'latest',
      'react-draggable': 'latest',
    });
  });

  it('should support direct import', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { withStyles } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider as MuiPickersLocalizationProvider, KeyboardTimePicker, KeyboardDatePicker } from '@mui/lab';
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'latest',
      '@mui/lab': 'latest',
      'date-fns': 'latest',
    });
  });

  it('should support import for side effect', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import '@mui/material/Grid';
import '@mui/material/styles';
import '@mui/lab/AdapterDateFns';
import '@mui/lab';
import 'exceljs';
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'latest',
      '@mui/lab': 'latest',
      'date-fns': 'latest',
      exceljs: 'latest',
    });
  });

  it('can collect required @types packages', () => {
    const { dependencies } = SandboxDependencies({
      raw: s1,
      codeVariant: 'TS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@foo-bar/bip': 'latest',
      '@mui/material': 'latest',
      '@mui/base': 'latest',
      '@types/foo-bar__bip': 'latest',
      '@types/prop-types': 'latest',
      '@types/react-dom': 'latest',
      '@types/react': 'latest',
      typescript: 'latest',
    });
  });

  it('should handle multilines', () => {
    const source = `
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  LocalizationProvider as MuiPickersLocalizationProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@mui/lab';
    `;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'latest',
      '@mui/lab': 'latest',
      'date-fns': 'latest',
    });
  });

  it('should include core if lab present', () => {
    const source = `
import lab from '@mui/lab';
    `;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'latest',
      '@mui/lab': 'latest',
    });
  });

  it('can use codesandbox deploys if a commit is given', () => {
    const source = `
import * as UICore from '@danielmana/ui-core';
import * as UIComponents from '@danielmana/ui-components';
    `;

    const { dependencies } = SandboxDependencies(
      {
        raw: source,
        codeVariant: 'JS',
        product: 'ui-components',
      },
      { commitRef: '2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f' },
    );

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@danielmana/ui-core':
        'https://pkg.csb.dev/danielmana/ui-packages/commit/2d0e8b4d/@danielmana/ui-core',
      '@danielmana/ui-components':
        'https://pkg.csb.dev/danielmana/ui-packages/commit/2d0e8b4d/@danielmana/ui-components',
    });
  });

  it('should date adapters', () => {
    const source = `
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import AdapterMoment from '@mui/lab/AdapterMoment';
    `;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'latest',
      '@mui/lab': 'latest',
      'date-fns': 'latest',
      dayjs: 'latest',
      luxon: 'latest',
      moment: 'latest',
    });
  });
});
