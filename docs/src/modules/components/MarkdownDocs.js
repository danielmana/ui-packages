import * as React from 'react';
import PropTypes from 'prop-types';
import Demo from 'docs/src/modules/components/Demo';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { exactProp } from '@mui/utils';
import ComponentLinkHeader from 'docs/src/modules/components/ComponentLinkHeader';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';

// TODO: Only import on demand via @mui/markdown/loader
const markdownComponents = {
  'modules/components/ComponentLinkHeader.js': ComponentLinkHeader,
};

function noComponent(moduleID) {
  return function NoComponent() {
    throw new Error(`No demo component provided for '${moduleID}'`);
  };
}

function MarkdownDocs(props) {
  const { disableToc = false, demos = {}, docs, demoComponents } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  const { description, location, rendered, title, toc, headers } = docs[userLanguage] || docs.en;

  return (
    <AppLayoutDocs
      description={description}
      disableToc={disableToc}
      location={location}
      title={title}
      toc={toc}
    >
      <React.Fragment>
        {rendered.map((renderedMarkdownOrDemo, index) => {
          if (typeof renderedMarkdownOrDemo === 'string') {
            return (
              <React.Fragment key={index}>
                <MarkdownElement renderedMarkdown={renderedMarkdownOrDemo} />
              </React.Fragment>
            );
          }

          if (renderedMarkdownOrDemo.component) {
            const Component = markdownComponents[renderedMarkdownOrDemo.component];
            return (
              <React.Fragment key={index}>
                <Component headers={headers} options={renderedMarkdownOrDemo} />
              </React.Fragment>
            );
          }

          const name = renderedMarkdownOrDemo.demo;
          const demo = demos?.[name];
          if (demo === undefined) {
            const errorMessage = [
              `Missing demo: ${name}. You can use one of the following:`,
              Object.keys(demos),
            ].join('\n');

            if (userLanguage === 'en') {
              throw new Error(errorMessage);
            }

            if (process.env.NODE_ENV !== 'production') {
              console.error(errorMessage);
            }

            const warnIcon = (
              <span role="img" aria-label={t('emojiWarning')}>
                ⚠️
              </span>
            );
            return (
              <div key={index}>
                {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                {warnIcon} Missing demo `{name}` {warnIcon}
              </div>
            );
          }

          const splitLocationBySlash = location.split('/');
          splitLocationBySlash.pop();
          const fileNameWithLocation = `${splitLocationBySlash.join('/')}/${name}`;

          return (
            <Demo
              key={index}
              demo={{
                raw: demo.raw,
                js: demoComponents[demo.module] ?? noComponent(demo.module),
                jsxPreview: demo.jsxPreview,
                rawTS: demo.rawTS,
                tsx: demo.moduleTS ? demoComponents[demo.moduleTS] : null,
              }}
              demoOptions={renderedMarkdownOrDemo}
              githubLocation={`https://github.com/danielmana/ui-packages/blob/main${fileNameWithLocation}`}
            />
          );
        })}
      </React.Fragment>
    </AppLayoutDocs>
  );
}

MarkdownDocs.propTypes = {
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}

export default MarkdownDocs;
