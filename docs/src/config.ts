const getConfig = () => {
  // process.env.PULL_REQUEST is from next.config.js
  const DEPLOY_CONTEXT = process.env.PULL_REQUEST ? 'deploy-preview' : 'production';
  if (process.env.NODE_ENV !== 'production' || DEPLOY_CONTEXT === 'deploy-preview') {
    // for testing purposes in development and deploy-preview
    return {
      DEPLOY_CONTEXT,
    };
  }
  // only for mui.com
  return {
    DEPLOY_CONTEXT,
  };
};

const CONFIG = getConfig();

export default CONFIG;
