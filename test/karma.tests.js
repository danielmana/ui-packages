import './utils/init';
import './utils/setupKarma';

const uiCoreContext = require.context('../packages/ui-core/src/', true, /\.test\.(js|ts|tsx)$/);
uiCoreContext.keys().forEach(uiCoreContext);

const uiComponentsContext = require.context(
  '../packages/ui-components/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
uiComponentsContext.keys().forEach(uiComponentsContext);
