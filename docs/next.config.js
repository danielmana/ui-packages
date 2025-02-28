const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('../package.json');
const { findPages } = require('./src/modules/utils/find');
const { LANGUAGES } = require('./src/modules/constants');

const workspaceRoot = path.join(__dirname, '../');

const reactStrictMode = true;
if (reactStrictMode) {
  // eslint-disable-next-line no-console
  console.log(`Using React.StrictMode.`);
}
// const l10nPRInNetlify = /^l10n_/.test(process.env.HEAD) && process.env.NETLIFY === 'true';
// const vercelDeploy = Boolean(process.env.VERCEL);
// const isDeployPreview = process.env.PULL_REQUEST === 'true';
// For crowdin PRs we want to build all locales for testing.
// const buildOnlyEnglishLocale = isDeployPreview && !l10nPRInNetlify && !vercelDeploy;
const buildOnlyEnglishLocale = true;

const staging =
  process.env.REPOSITORY_URL === undefined ||
  // The linked repository url comes from https://app.netlify.com/sites/material-ui/settings/deploys
  /mui-org\/material-ui$/.test(process.env.REPOSITORY_URL);

if (staging) {
  // eslint-disable-next-line no-console
  console.log(`Staging deploy of ${process.env.REPOSITORY_URL || 'local repository'}`);
}

const baseline = {
  experimental: {
    scrollRestoration: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Motivated by https://github.com/vercel/next.js/issues/7687
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  // Can be turned on when https://github.com/vercel/next.js/issues/24640 is fixed
  optimizeFonts: false,
};

module.exports = {
  ...baseline,
  baseline, // Exported so the other projects can use this configuration directly.
  webpack: (config, options) => {
    const plugins = config.plugins.slice();

    if (process.env.DOCS_STATS_ENABLED) {
      plugins.push(
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          generateStatsFile: true,
          analyzerPort: options.isServer ? 8888 : 8889,
          reportTitle: `${options.isServer ? 'server' : 'client'} docs bundle`,
          // Will be available at `.next/${statsFilename}`
          statsFilename: `stats-${options.isServer ? 'server' : 'client'}.json`,
        }),
      );
    }

    // next includes node_modules in webpack externals. Some of those have dependencies
    // on the aliases defined above. If a module is an external those aliases won't be used.
    // We need tell webpack to not consider those packages as externals.
    if (
      options.isServer &&
      // Next executes this twice on the server with React 18 (once per runtime).
      // We only care about Node runtime at this point.
      (options.nextRuntime === undefined || options.nextRuntime === 'nodejs')
    ) {
      const [nextExternals, ...externals] = config.externals;

      config.externals = [
        (ctx, callback) => {
          const { request } = ctx;
          const hasDependencyOnRepoPackages = ['notistack'].some((dep) => request.startsWith(dep));

          if (hasDependencyOnRepoPackages) {
            return callback(null);
          }
          return nextExternals(ctx, callback);
        },
        ...externals,
      ];
    }

    config.module.rules.forEach((r) => {
      r.resourceQuery = { not: [/raw/] };
    });

    return {
      ...config,
      plugins,
      resolve: {
        ...config.resolve,
        // resolve .tsx first
        extensions: [
          '.tsx',
          ...config.resolve.extensions.filter((extension) => extension !== '.tsx'),
        ],
      },
      module: {
        ...config.module,
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            oneOf: [
              {
                resourceQuery: /@mui\/markdown/,
                use: [options.defaultLoaders.babel, require.resolve('@mui/markdown/loader')],
              },
              {
                // used in some /getting-started/templates
                type: 'asset/source',
              },
            ],
          },
          // transpile 3rd party packages with dependencies in this repository
          {
            test: /\.(js|mjs|jsx)$/,
            resourceQuery: { not: [/raw/] },
            include:
              /node_modules(\/|\\)(notistack|@mui(\/|\\)x-data-grid|@mui(\/|\\)x-data-grid-pro|@mui(\/|\\)x-license-pro|@mui(\/|\\)x-data-grid-generator|@mui(\/|\\)x-date-pickers-pro|@mui(\/|\\)x-date-pickers)/,
            use: {
              loader: 'babel-loader',
              options: {
                // on the server we use the transpiled commonJS build, on client ES6 modules
                // babel needs to figure out in what context to parse the file
                sourceType: 'unambiguous',
                plugins: [
                  [
                    'babel-plugin-module-resolver',
                    {
                      alias: {
                        // all packages in this monorepo
                        '@danielmana/ui-core': '../packages/ui-core/src',
                        '@danielmana/ui-components': '../packages/ui-components/src',
                      },
                      // transformFunctions: ['require'],
                    },
                  ],
                ],
              },
            },
          },
          // required to transpile ../packages/
          {
            test: /\.(js|mjs|tsx|ts)$/,
            resourceQuery: { not: [/raw/] },
            include: [workspaceRoot],
            exclude: /(node_modules|mui-icons-material)/,
            use: options.defaultLoaders.babel,
          },
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
        ]),
      },
    };
  },
  env: {
    COMMIT_REF: process.env.COMMIT_REF,
    ENABLE_AD_IN_DEV_MODE: process.env.ENABLE_AD_IN_DEV_MODE,
    GITHUB_AUTH: process.env.GITHUB_AUTH,
    GIT_REVIEW_ID: process.env.REVIEW_ID,
    LIB_VERSION: pkg.version,
    NETLIFY_DEPLOY_URL: process.env.DEPLOY_URL || 'http://localhost:3000',
    NETLIFY_SITE_NAME: process.env.SITE_NAME || 'material-ui',
    PULL_REQUEST: process.env.PULL_REQUEST === 'true',
    // #default-branch-switch
    SOURCE_CODE_ROOT_URL: 'https://github.com/danielmana/ui-packages/blob/main',
    SOURCE_CODE_REPO: 'https://github.com/danielmana/ui-packages',
    STAGING: staging,
    BUILD_ONLY_ENGLISH_LOCALE: buildOnlyEnglishLocale,
  },
  // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
  // However, we don't in order to prevent any regression in the `findPages()` method.
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(pages2, userLanguage) {
      const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

      pages2.forEach((page) => {
        if (page.pathname.startsWith('/experiments') && !staging) {
          return;
        }
        if (!page.children) {
          // map api-docs to api
          // i: /api-docs/* > /api/* (old structure)
          // ii: /*/api-docs/* > /*/api/* (for new structure)
          map[`${prefix}${page.pathname.replace(/^(\/[^/]+)?\/api-docs\/(.*)/, '$1/api/$2')}`] = {
            page: page.pathname,
            query: {
              userLanguage,
            },
          };
          return;
        }

        traverse(page.children, userLanguage);
      });
    }

    // eslint-disable-next-line no-console
    console.log('Considering only English for SSR');
    traverse(pages, 'en');

    return map;
  },
  reactStrictMode,
  // rewrites has no effect when run `next export` for production
  rewrites: async () => {
    return [
      { source: `/:lang(${LANGUAGES.join('|')})?/:rest*`, destination: '/:rest*' },
      // Make sure to include the trailing slash if `trailingSlash` option is set
      { source: '/api/:rest*/', destination: '/api-docs/:rest*/' },
      { source: `/static/x/:rest*`, destination: 'http://0.0.0.0:3001/static/x/:rest*' },
    ];
  },
};
