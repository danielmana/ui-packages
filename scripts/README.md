# MUI Scripts

## Release

A typical release goes like this:

### Prepare

The following steps must be proposed as a pull request.

1. Generate the changelog with `yarn release:changelog`
   The output must be prepended to the top level `CHANGELOG.md`
   `yarn release:changelog --help` for more information.

1. Clean the generated changelog, to match the format of https://github.com/danielmana/ui-packages/releases.
1. Update the root `/package.json`'s version
1. `yarn release:version` (🔔 manually remove `^` from packages with prerelease version, eg. `-alpha`)
1. Open PR with changes and wait for review and green CI
1. Merge PR once CI is green and it has been approved

### Release

1. checkout merge commit of the merged PR
1. `yarn`
1. `yarn release:build`
1. `yarn release:publish`
1. `yarn release:tag`

### Documentation

It lives at https://verdant-klepon-5d2a5e.netlify.app/
