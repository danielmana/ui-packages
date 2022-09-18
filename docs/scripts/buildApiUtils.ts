import { getLineFeed } from 'docs/scripts/helpers';
import { findPagesMarkdownNew } from 'docs/src/modules/utils/find';
import fs from 'fs';
import kebabCase from 'lodash/kebabCase';
import path from 'path';

import { getHeaders, getTitle } from '@mui/markdown';

function getMuiName(name: string) {
  return `Mui${name.replace('Unstyled', '').replace('Styled', '')}`;
}

export const extractPackageFile = (filePath: string) => {
  filePath = filePath.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const match = filePath.match(
    /.*\/packages.*\/(?<packagePath>[^/]+)\/src\/(.*\/)?(?<name>[^/]+)\.(js|tsx|ts|d\.ts)/,
  );
  const result = {
    packagePath: match ? match.groups?.packagePath! : null,
    name: match ? match.groups?.name! : null,
  };
  return {
    ...result,
    muiPackage: result.packagePath?.replace('x-', 'mui-'),
  };
};

export const extractApiPage = (filePath: string) => {
  filePath = filePath.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  return {
    apiPathname: filePath
      .replace(/^.*\/pages/, '')
      .replace(/\.(js|tsx)/, '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, ''),
  };
};

const parseFile = (filename: string) => {
  const src = fs.readFileSync(filename, 'utf8');
  return {
    src,
    shouldSkip:
      filename.indexOf('internal') !== -1 ||
      !!src.match(/@ignore - internal component\./) ||
      !!src.match(/@ignore - do not document\./),
    spread: !src.match(/ = exactProp\(/),
    EOL: getLineFeed(src),
    inheritedComponent: src.match(/\/\/ @inheritedComponent (.*)/)?.[1],
  };
};

export type ComponentInfo = {
  /**
   * Full path to the file
   */
  filename: string;
  /**
   * Component name
   */
  name: string;
  /**
   * Component name with `Mui` prefix
   */
  muiName: string;
  apiPathname: string;
  readFile: () => {
    src: string;
    spread: boolean;
    shouldSkip: boolean;
    EOL: string;
    inheritedComponent?: string;
  };
  getInheritance: (inheritedComponent?: string) => null | {
    /**
     * Component name
     */
    name: string;
    /**
     * API pathname
     */
    apiPathname: string;
  };
  getDemos: () => Array<{ name: string; demoPathname: string }>;
  apiPagesDirectory: string;
  skipApiGeneration?: boolean;
  /**
   * If `true`, the component's name match one of the system components.
   */
  isSystemComponent?: boolean;
};

function findUICoreDemos(
  componentName: string,
  pagesMarkdown: ReadonlyArray<{ pathname: string; title: string; components: readonly string[] }>,
) {
  return pagesMarkdown
    .filter(
      (page) => page.pathname.indexOf('/ui-core/') === 0 && page.components.includes(componentName),
    )
    .map((page) => ({
      name: page.title,
      // demoPathname: page.pathname.replace(/\/components\//, '/'),
      demoPathname: `${page.pathname.replace('/components/', '/react-')}/`,
    }));
}

export const getUICoreComponentInfo = (filename: string): ComponentInfo => {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/ui-core/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/ui-core/api`),
    isSystemComponent: false,
    readFile() {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance(inheritedComponent = srcInfo?.inheritedComponent) {
      if (!inheritedComponent) {
        return null;
      }
      return {
        name: inheritedComponent,
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `${
                inheritedComponent.match(/unstyled/i) ? '/base' : 'https://mui.com/material-ui'
              }/api/${kebabCase(inheritedComponent)}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdownNew().map((markdown) => {
        const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
        const markdownHeaders = getHeaders(markdownContent) as any;

        return {
          ...markdown,
          title: getTitle(markdownContent),
          components: markdownHeaders.components as string[],
        };
      });
      return findUICoreDemos(name, allMarkdowns).map((info) => ({
        ...info,
        demoPathname: info.demoPathname,
      }));
    },
  };
};

function findUIComponentsDemos(
  componentName: string,
  pagesMarkdown: ReadonlyArray<{ pathname: string; title: string; components: readonly string[] }>,
) {
  return pagesMarkdown
    .filter(
      (page) =>
        page.pathname.indexOf('/ui-components/') === 0 && page.components.includes(componentName),
    )
    .map((page) => ({
      name: page.title,
      // demoPathname: page.pathname.replace(/\/components\//, '/'),
      demoPathname: `${page.pathname.replace('/components/', '/react-')}/`,
    }));
}

export const getUIComponentsComponentInfo = (filename: string): ComponentInfo => {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/ui-components/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/ui-components/api`),
    isSystemComponent: false,
    readFile() {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance(inheritedComponent = srcInfo?.inheritedComponent) {
      if (!inheritedComponent) {
        return null;
      }
      return {
        name: inheritedComponent,
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'http://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `${
                inheritedComponent.match(/unstyled/i) ? '/base' : 'https://mui.com/material-ui'
              }/api/${kebabCase(inheritedComponent)}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdownNew().map((markdown) => {
        const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
        const markdownHeaders = getHeaders(markdownContent) as any;

        return {
          ...markdown,
          title: getTitle(markdownContent),
          components: markdownHeaders.components as string[],
        };
      });
      return findUIComponentsDemos(name, allMarkdowns).map((info) => ({
        ...info,
        demoPathname: info.demoPathname,
      }));
    },
  };
};
