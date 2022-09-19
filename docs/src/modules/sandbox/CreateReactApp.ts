export const getHtml = ({ title, language }: { title: string; language: string }) => {
  return `<!DOCTYPE html>
<html lang="${language}">
  <head>
    <title>${title}</title>
    <!-- Fonts to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <!-- Icons to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
};

export const getRootIndex = (product?: 'base' | 'ui-core' | 'ui-components') => {
  if (product === 'base') {
    return `import * as React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);`;
  }
  return `import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@danielmana/ui-core/styles';
import Demo from './demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <Demo />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);`;
};

export const getTsconfig = () => `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
`;
