/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import * as core from './index';

describe('@danielmana/ui-core', () => {
  it('should have exports', () => {
    expect(typeof core).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(core).forEach((exportKey) =>
      expect(`${exportKey}-${Boolean(core[exportKey])}`).to.equal(`${exportKey}-true`),
    );
  });
});
