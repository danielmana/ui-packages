import generateComponentApi, {
  ReactApi,
  writePrettifiedFile,
} from 'docs/scripts/ApiBuilders/ComponentApiBuilder';
import {
  ComponentInfo,
  extractApiPage,
  getUIComponentsComponentInfo,
  getUICoreComponentInfo,
} from 'docs/scripts/buildApiUtils';
import { findComponents } from 'docs/src/modules/utils/find';
import { mkdirSync } from 'fs';
import * as fse from 'fs-extra';
import path from 'path';
import * as ttp from 'typescript-to-proptypes';
import * as yargs from 'yargs';

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = fse.readdirSync(dirPath);

  files.forEach((file) => {
    if (fse.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

function findApiPages(relativeFolder: string) {
  let pages: Array<{ pathname: string }> = [];
  let filePaths = [];
  try {
    filePaths = getAllFiles(path.join(process.cwd(), relativeFolder));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return [];
  }
  filePaths.forEach((itemPath) => {
    if (itemPath.endsWith('.js')) {
      const data = extractApiPage(itemPath);

      pages.push({ pathname: data.apiPathname });
    }
  });

  // sort by pathnames without '-' so that e.g. card comes before card-action
  pages = pages.sort((a, b) => {
    const pathnameA = a.pathname.replace(/-/g, '');
    const pathnameB = b.pathname.replace(/-/g, '');
    if (pathnameA < pathnameB) {
      return -1;
    }
    if (pathnameA > pathnameB) {
      return 1;
    }
    return 0;
  });

  return pages;
}

interface Settings {
  input: {
    /**
     * Component directories to be used to generate API
     */
    libDirectory: string[];
  };
  output: {
    /**
     * The output path of `pagesApi` generated from `input.pageDirectory`
     */
    apiManifestPath: string;
  };
  getApiPages: () => Array<{ pathname: string }>;
  getComponentInfo: (filename: string) => ComponentInfo;
}

const SETTINGS: Settings[] = [
  {
    input: {
      libDirectory: [path.join(process.cwd(), 'packages/ui-core/src')],
    },
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/ui-core/pagesApi.js'),
    },
    getApiPages: () => findApiPages('docs/pages/ui-core/api'),
    getComponentInfo: getUICoreComponentInfo,
  },
  {
    input: {
      libDirectory: [path.join(process.cwd(), 'packages/ui-components/src')],
    },
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/ui-components/pagesApi.js'),
    },
    getApiPages: () => findApiPages('docs/pages/ui-components/api'),
    getComponentInfo: getUIComponentsComponentInfo,
  },
];

type CommandOptions = { grep?: string };

async function run(argv: CommandOptions) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);
  let allBuilds: Array<PromiseSettledResult<ReactApi | null>> = [];
  await SETTINGS.reduce(async (resolvedPromise, setting) => {
    await resolvedPromise;
    const workspaceRoot = path.resolve(__dirname, '../../');
    /**
     * @type {string[]}
     */
    const componentDirectories = setting.input.libDirectory;
    const apiPagesManifestPath = setting.output.apiManifestPath;

    const manifestDir = apiPagesManifestPath.match(/(.*)\/[^/]+\./)?.[1];
    if (manifestDir) {
      mkdirSync(manifestDir, { recursive: true });
    }

    /**
     * components: Array<{ filename: string }>
     * e.g.
     * [{ filename: '/Users/user/Projects/material-ui/packages/mui-material/src/Accordion/Accordion.js'}, ...]
     */
    const components = componentDirectories
      .reduce((directories, componentDirectory) => {
        return directories.concat(findComponents(componentDirectory));
      }, [] as ReadonlyArray<{ filename: string }>)
      .filter((component) => {
        if (
          component.filename.includes('ThemeProvider') ||
          (component.filename.includes('mui-material') &&
            component.filename.includes('CssVarsProvider'))
        ) {
          return false;
        }
        if (grep === null) {
          return true;
        }
        return grep.test(component.filename);
      });

    const tsconfig = ttp.loadConfig(path.resolve(workspaceRoot, './tsconfig.json'));
    const program = ttp.createTSProgram(
      components.map((component) => {
        if (component.filename.endsWith('.tsx')) {
          return component.filename;
        }
        if (component.filename.endsWith('.js')) {
          return component.filename.replace(/\.js$/, '.d.ts');
        }
        throw new TypeError(
          `Unexpected component filename '${component.filename}'. Expected either a .tsx or .js file.`,
        );
      }),
      tsconfig,
    );

    const componentBuilds = components.map(async (component) => {
      try {
        const { filename } = component;
        const componentInfo = setting.getComponentInfo(filename);

        mkdirSync(componentInfo.apiPagesDirectory, { mode: 0o777, recursive: true });

        return generateComponentApi(componentInfo, program);
      } catch (error: any) {
        error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
        throw error;
      }
    });

    const builds = await Promise.allSettled(componentBuilds);

    const fails = builds.filter(
      (promise): promise is PromiseRejectedResult => promise.status === 'rejected',
    );

    fails.forEach((build) => {
      console.error(build.reason);
    });
    if (fails.length > 0) {
      process.exit(1);
    }

    allBuilds = [...allBuilds, ...builds];

    const source = `module.exports = ${JSON.stringify(setting.getApiPages())}`;
    writePrettifiedFile(apiPagesManifestPath, source);
    return Promise.resolve();
  }, Promise.resolve());

  // if (grep === null) {
  //   const componentApis = allBuilds
  //     .filter((build): build is PromiseFulfilledResult<ReactApi> => {
  //       return build.status === 'fulfilled' && build.value !== null;
  //     })
  //     .map((build) => {
  //       return build.value;
  //     });
  //   await removeOutdatedApiDocsTranslations(componentApis);
  // }
}

yargs
  .command<CommandOptions>({
    command: '$0',
    describe: 'formats codebase',
    builder: (command) => {
      return command.option('grep', {
        description:
          'Only generate files for component filenames matching the pattern. The string is treated as a RegExp.',
        type: 'string',
      });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
