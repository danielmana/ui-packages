const path = require('path');

// WARNING: Use this module only as an inspiration.
// Cherry-pick the parts you need and inline them in the webpack.config you need.
// This module isn't used to build the documentation. We use Next.js for that.
// This module is used by the visual regression tests to run the demos and by eslint-plugin-import.
module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      '@danielmana/ui-core': path.resolve(__dirname, './packages/ui-core/src'),
      '@danielmana/ui-components': path.resolve(__dirname, './packages/ui-components/src'),
      'typescript-to-proptypes': path.resolve(__dirname, './packages/typescript-to-proptypes/src'),
      docs: path.resolve(__dirname, './docs'),
    },
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
};
