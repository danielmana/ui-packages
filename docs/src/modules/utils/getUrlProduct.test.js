import { expect } from 'chai';
import getUrlProduct from './getUrlProduct';

describe('getUrlProduct', () => {
  it('get material-ui', () => {
    expect(getUrlProduct('/material-ui/react-button/')).to.equal('material-ui');
    expect(getUrlProduct('/zh/material-ui/react-button/')).to.equal('material-ui');
  });

  it('get base', () => {
    expect(getUrlProduct('/base/react-button-unstyled/')).to.equal('base');
    expect(getUrlProduct('/zh/base/react-button-unstyled/')).to.equal('base');
  });

  it('get system', () => {
    expect(getUrlProduct('/system/')).to.equal('system');
    expect(getUrlProduct('/zh/system/getting-started/overview/')).to.equal('system');
  });

  it('get data-grid', () => {
    expect(getUrlProduct('/x/react-data-grid/components')).to.equal('data-grid');
    expect(getUrlProduct('/zh/x/react-data-grid/components')).to.equal('data-grid');
  });

  it('get date-picker', () => {
    expect(getUrlProduct('/x/react-date-picker/components')).to.equal('date-picker');
    expect(getUrlProduct('/zh/x/react-date-picker/components')).to.equal('date-picker');
  });

  it('get ui-core', () => {
    expect(getUrlProduct('/ui-core/react-button/')).to.equal('ui-core');
  });

  // TODO danielmana: add test to ui-components#getUrlProduct()
  // it('get ui-components', () => {
  //   expect(getUrlProduct('/ui-components/my-component/')).to.equal('ui-components');
  // });
});
