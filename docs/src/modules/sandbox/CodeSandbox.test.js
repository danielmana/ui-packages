import { expect } from 'chai';
import CodeSandbox from './CodeSandbox';

const testCase = `import * as React from 'react';

import { Button, Stack } from '@danielmana/ui-core';

export default function ButtonColor() {
  return (
    <Stack direction="row" spacing={2}>
      <Button color="secondary">Secondary</Button>
      <Button color="tertiary">Tertiary</Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>
    </Stack>
  );
}
`;

describe('CodeSandbox', () => {
  it('generate the correct JavaScript result', () => {
    const result = CodeSandbox.createReactApp({
      title: 'ButtonColor Demo',
      githubLocation:
        'https://github.com/danielmana/ui-packages/blob/v0.1.12/docs/data/ui-core/components/button/ButtonColor.js',
      codeVariant: 'JS',
      language: 'en',
      raw: testCase,
    });
    expect(result.files).to.deep.equal({
      'package.json': {
        content: {
          description:
            'https://github.com/danielmana/ui-packages/blob/v0.1.12/docs/data/ui-core/components/button/ButtonColor.js',
          dependencies: {
            react: 'latest',
            'react-dom': 'latest',
            '@danielmana/ui-core': 'latest',
            '@mui/material': 'latest',
            '@emotion/react': 'latest',
            '@emotion/styled': 'latest',
          },
          devDependencies: {
            'react-scripts': 'latest',
          },
        },
      },
      'public/index.html': {
        content:
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>ButtonColor Demo</title>\n    <!-- Fonts to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"\n    />\n    <!-- Icons to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/icon?family=Material+Icons"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
      },
      'demo.js': {
        content:
          'import * as React from \'react\';\n\nimport { Button, Stack } from \'@danielmana/ui-core\';\n\nexport default function ButtonColor() {\n  return (\n    <Stack direction="row" spacing={2}>\n      <Button color="secondary">Secondary</Button>\n      <Button color="tertiary">Tertiary</Button>\n      <Button variant="contained" color="success">\n        Success\n      </Button>\n      <Button variant="outlined" color="error">\n        Error\n      </Button>\n    </Stack>\n  );\n}\n',
      },
      'index.js': {
        content:
          "import * as React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport { StyledEngineProvider } from '@mui/material/styles';\nimport { ThemeProvider } from '@danielmana/ui-core/styles';\nimport Demo from './demo';\n\nReactDOM.createRoot(document.querySelector(\"#root\")).render(\n  <React.StrictMode>\n    <StyledEngineProvider injectFirst>\n      <ThemeProvider>\n        <Demo />\n      </ThemeProvider>\n    </StyledEngineProvider>\n  </React.StrictMode>\n);",
      },
    });
  });

  it('generate the correct TypeScript result', () => {
    const result = CodeSandbox.createReactApp({
      title: 'ButtonColor Demo',
      githubLocation:
        'https://github.com/danielmana/ui-packages/blob/v0.1.12/docs/data/ui-core/components/button/ButtonColor.tsx',
      codeVariant: 'TS',
      language: 'en',
      raw: testCase,
    });
    expect(result.files).to.deep.equal({
      'package.json': {
        content: {
          description:
            'https://github.com/danielmana/ui-packages/blob/v0.1.12/docs/data/ui-core/components/button/ButtonColor.tsx',
          dependencies: {
            react: 'latest',
            'react-dom': 'latest',
            '@danielmana/ui-core': 'latest',
            '@mui/material': 'latest',
            '@emotion/react': 'latest',
            '@emotion/styled': 'latest',
            '@types/react': 'latest',
            '@types/react-dom': 'latest',
            typescript: 'latest',
          },
          devDependencies: {
            'react-scripts': 'latest',
          },
          main: 'index.tsx',
          scripts: {
            start: 'react-scripts start',
          },
        },
      },
      'public/index.html': {
        content:
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>ButtonColor Demo</title>\n    <!-- Fonts to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"\n    />\n    <!-- Icons to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/icon?family=Material+Icons"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
      },
      'demo.tsx': {
        content:
          'import * as React from \'react\';\n\nimport { Button, Stack } from \'@danielmana/ui-core\';\n\nexport default function ButtonColor() {\n  return (\n    <Stack direction="row" spacing={2}>\n      <Button color="secondary">Secondary</Button>\n      <Button color="tertiary">Tertiary</Button>\n      <Button variant="contained" color="success">\n        Success\n      </Button>\n      <Button variant="outlined" color="error">\n        Error\n      </Button>\n    </Stack>\n  );\n}\n',
      },
      'index.tsx': {
        content:
          "import * as React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport { StyledEngineProvider } from '@mui/material/styles';\nimport { ThemeProvider } from '@danielmana/ui-core/styles';\nimport Demo from './demo';\n\nReactDOM.createRoot(document.querySelector(\"#root\")).render(\n  <React.StrictMode>\n    <StyledEngineProvider injectFirst>\n      <ThemeProvider>\n        <Demo />\n      </ThemeProvider>\n    </StyledEngineProvider>\n  </React.StrictMode>\n);",
      },
      'tsconfig.json': {
        content:
          '{\n  "compilerOptions": {\n    "target": "es5",\n    "lib": [\n      "dom",\n      "dom.iterable",\n      "esnext"\n    ],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "esModuleInterop": true,\n    "allowSyntheticDefaultImports": true,\n    "strict": true,\n    "forceConsistentCasingInFileNames": true,\n    "module": "esnext",\n    "moduleResolution": "node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "noEmit": true,\n    "jsx": "react"\n  },\n  "include": [\n    "src"\n  ]\n}\n',
      },
    });
    expect(result.dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@danielmana/ui-core': 'latest',
      '@mui/material': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@types/react': 'latest',
      '@types/react-dom': 'latest',
      typescript: 'latest',
    });
    expect(result.devDependencies).to.deep.equal({
      'react-scripts': 'latest',
    });
  });
});
