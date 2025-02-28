const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const glob = require('fast-glob');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const workspaceRoot = path.join(__dirname, '..', '..');

async function getWebpackEntries() {
  // ui-core
  const uicorePackagePath = path.join(workspaceRoot, 'packages/ui-core/build');
  const uicoreComponents = (await glob(path.join(uicorePackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        id: `@danielmana/ui-core/${componentName}`,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  // ui-components
  const uiComponentsPackagePath = path.join(workspaceRoot, 'packages/ui-components/build');
  const uiComponents = (await glob(path.join(uiComponentsPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        id: `@danielmana/ui-components/${componentName}`,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  return [
    {
      id: '@danielmana/ui-core',
      path: path.join(path.relative(workspaceRoot, uicorePackagePath), 'index.js'),
    },
    ...uicoreComponents,
    {
      id: '@danielmana/ui-components',
      path: path.join(path.relative(workspaceRoot, uiComponentsPackagePath), 'index.js'),
    },
    ...uiComponents,
  ];
}

function createWebpackConfig(entry, environment) {
  const analyzerMode = environment.analyze ? 'static' : 'disabled';
  const concatenateModules = !environment.accurateBundles;

  /**
   * @type {import('webpack').Configuration}
   */
  const configuration = {
    // ideally this would be computed from the bundles peer dependencies
    // Ensure that `react` as well as `react/*` are considered externals but not `react*`
    externals: /^(date-fns|dayjs|luxon|moment|react|react-dom)(\/.*)?$/,
    mode: 'production',
    optimization: {
      concatenateModules,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
        }),
      ],
    },
    output: {
      filename: '[name].js',
      library: {
        // TODO: Use `type: 'module'` once it is supported (currently incompatible with `externals`)
        name: 'M',
        type: 'var',
        // type: 'module',
      },
      path: path.join(__dirname, 'build'),
    },
    plugins: [
      new CompressionPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode,
        // We create a report for each bundle so around 120 reports.
        // Opening them all is spam.
        // If opened with `webpack --config . --analyze` it'll still open one new tab though.
        openAnalyzer: false,
        // '[name].html' not supported: https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/12
        reportFilename: `${entry.id}.html`,
      }),
    ],
    resolve: {
      alias: {
        '@danielmana/ui-core': path.join(workspaceRoot, 'packages/ui-core/build'),
        '@danielmana/ui-components': path.join(workspaceRoot, 'packages/ui-components/build'),
      },
    },
    entry: { [entry.id]: path.join(workspaceRoot, entry.path) },
    // TODO: 'browserslist:modern'
    // See https://github.com/webpack/webpack/issues/14203
    target: 'web',
  };

  return configuration;
}

exports.getWebpackEntries = getWebpackEntries;
exports.createWebpackConfig = createWebpackConfig;
