/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import * as components from './index';

describe('@danielmana/ui-components', () => {
  it('should have exports', () => {
    expect(typeof components).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(components).forEach((exportKey) =>
      expect(`${exportKey}-${Boolean(components[exportKey])}`).to.equal(`${exportKey}-true`),
    );
  });
});
