const childProcess = require('child_process');
const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const yargs = require('yargs');

/**
 * Only directly call it with side-effect free commands.
 * Otherwise use the `exec` that's considering whether the context is supposed to be "dry" i.e. have no side-effects.
 */
const execActual = promisify(childProcess.exec);
/**
 * @param {string} command
 * @param {unknown} [options]
 */
function execDry(command, options) {
  // eslint-disable-next-line no-console
  console.log(`exec(\`${command}\`, ${JSON.stringify(options)})`);
}

async function main(argv) {
  const { dryRun } = argv;

  const exec = dryRun ? execDry : execActual;

  const rootWorkspace = path.resolve(__dirname, '..');
  const rootWorkspaceManifest = await fse.readJSON(path.join(rootWorkspace, 'package.json'));

  const tag = `v${rootWorkspaceManifest.version}`;
  const message = `Version ${rootWorkspaceManifest.version}`;

  await exec(['git', 'tag', '-a', tag, '-m', `"${message}"`].join(' '));
  // eslint-disable-next-line no-console -- verbose logging
  console.log(`Created tag '${tag}'. To remove enter 'git tag -d ${tag}'`);

  const remote = 'origin';

  await exec(['git', 'push', remote, tag].join(' '));

  // eslint-disable-next-line no-console -- verbose logging
  console.log(
    `Pushed tag '${tag}' to . This should not be reversed. In case of emergency enter 'git push --delete ${remote} ${tag}' to remove.`,
  );
}

yargs
  .command({
    command: '$0',
    description: 'Tags the current release and pushes these changes to mui/material-ui.',
    builder: (command) => {
      return command.option('dryRun', {
        default: false,
        describe: 'If true, the script will not have any permanent side-effects.',
        type: 'boolean',
      });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
