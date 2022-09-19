import { expect } from 'chai';
import StackBlitz from './StackBlitz';

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

describe('StackBlitz', () => {
  it('generate the correct javascript result', () => {
    const result = StackBlitz.createReactApp({
      title: 'ButtonColor Demo',
      githubLocation:
        'https://github.com/danielmana/ui-packages/blob/v0.1.12/docs/data/ui-core/components/button/ButtonColor.js',
      codeVariant: 'JS',
      language: 'en',
      raw: testCase,
    });
    expect(result).to.deep.equal({
      title: 'ButtonColor Demo',
      description:
        'https://github.com/danielmana/ui-packages/blob/v0.1.12/docs/data/ui-core/components/button/ButtonColor.js',
      files: {
        'index.html':
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>ButtonColor Demo</title>\n    <!-- Fonts to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"\n    />\n    <!-- Icons to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/icon?family=Material+Icons"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
        'demo.js':
          'import * as React from \'react\';\n\nimport { Button, Stack } from \'@danielmana/ui-core\';\n\nexport default function ButtonColor() {\n  return (\n    <Stack direction="row" spacing={2}>\n      <Button color="secondary">Secondary</Button>\n      <Button color="tertiary">Tertiary</Button>\n      <Button variant="contained" color="success">\n        Success\n      </Button>\n      <Button variant="outlined" color="error">\n        Error\n      </Button>\n    </Stack>\n  );\n}\n',
        'index.js':
          "import * as React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport { StyledEngineProvider } from '@mui/material/styles';\nimport { ThemeProvider } from '@danielmana/ui-core/styles';\nimport Demo from './demo';\n\nReactDOM.createRoot(document.querySelector(\"#root\")).render(\n  <React.StrictMode>\n    <StyledEngineProvider injectFirst>\n      <ThemeProvider>\n        <Demo />\n      </ThemeProvider>\n    </StyledEngineProvider>\n  </React.StrictMode>\n);",
      },
      dependencies: {
        react: 'latest',
        'react-dom': 'latest',
        '@danielmana/ui-core': 'latest',
        '@mui/material': 'latest',
        '@emotion/react': 'latest',
        '@emotion/styled': 'latest',
      },
    });
  });

  it('generate the correct typescript result', () => {
    const result = StackBlitz.createReactApp({
      title: 'ButtonColor Demo',
      githubLocation:
        'https://github.com/danielmana/ui-packages/blob/v0.1.12/docs/data/ui-core/components/button/ButtonColor.tsx',
      codeVariant: 'TS',
      language: 'en',
      raw: testCase,
    });
    expect(result).to.deep.equal({
      title: 'ButtonColor Demo',
      description:
        'https://github.com/danielmana/ui-packages/blob/v0.1.12/docs/data/ui-core/components/button/ButtonColor.tsx',
      files: {
        'index.html':
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>ButtonColor Demo</title>\n    <!-- Fonts to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"\n    />\n    <!-- Icons to support Material Design -->\n    <link\n      rel="stylesheet"\n      href="https://fonts.googleapis.com/icon?family=Material+Icons"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>',
        'demo.tsx':
          'import * as React from \'react\';\n\nimport { Button, Stack } from \'@danielmana/ui-core\';\n\nexport default function ButtonColor() {\n  return (\n    <Stack direction="row" spacing={2}>\n      <Button color="secondary">Secondary</Button>\n      <Button color="tertiary">Tertiary</Button>\n      <Button variant="contained" color="success">\n        Success\n      </Button>\n      <Button variant="outlined" color="error">\n        Error\n      </Button>\n    </Stack>\n  );\n}\n',
        'index.tsx':
          "import * as React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport { StyledEngineProvider } from '@mui/material/styles';\nimport { ThemeProvider } from '@danielmana/ui-core/styles';\nimport Demo from './demo';\n\nReactDOM.createRoot(document.querySelector(\"#root\")).render(\n  <React.StrictMode>\n    <StyledEngineProvider injectFirst>\n      <ThemeProvider>\n        <Demo />\n      </ThemeProvider>\n    </StyledEngineProvider>\n  </React.StrictMode>\n);",
        'tsconfig.json':
          '{\n  "compilerOptions": {\n    "target": "es5",\n    "lib": [\n      "dom",\n      "dom.iterable",\n      "esnext"\n    ],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "esModuleInterop": true,\n    "allowSyntheticDefaultImports": true,\n    "strict": true,\n    "forceConsistentCasingInFileNames": true,\n    "module": "esnext",\n    "moduleResolution": "node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "noEmit": true,\n    "jsx": "react"\n  },\n  "include": [\n    "src"\n  ]\n}\n',
      },
      dependencies: {
        react: 'latest',
        '@danielmana/ui-core': 'latest',
        '@mui/material': 'latest',
        'react-dom': 'latest',
        '@emotion/react': 'latest',
        '@emotion/styled': 'latest',
        '@types/react': 'latest',
        '@types/react-dom': 'latest',
        typescript: 'latest',
      },
    });
  });
});
