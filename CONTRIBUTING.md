# Contributing to UI Packages

Here are a few guidelines that will help you along the way.

## Sending a Pull Request

Keep your Pull Requests small. To give a Pull Request the best chance of getting accepted, don't bundle more than one feature or bug fix per Pull Request. It's often best to create two smaller Pull Requests than one big one.

1. Clone the repository to your local machine:

```sh
git clone git@github.com:danielmana/ui-packages.git
cd ui-packages
```

2. Install the dependencies with yarn (npm isn't supported):

```sh
yarn install
```

3. Create a new topic branch:

```sh
git checkout -b <username>/<task-id>
```

4. Make changes, commit and push:

```sh
git push origin <username>/<task-id>
```

5. Go to [the repository](https://github.com/danielmana/ui-packages) and make a Pull Request.

### UI Core components

Read the [UI Core guide](/packages/ui-core/README.md) to learn about how to format the core components.

### Trying changes on the documentation site

The documentation site contains examples of all the components.
This is a great place to experiment with your changes.
It's the local development environment used by the maintainers.

To get started:

```sh
yarn start
```

You can now access the documentation site [locally](http://localhost:3000).
Changes to the docs will hot reload the site.

There is also a playground for a fast iteration development cycle. In order to use it, you can copy the `docs/pages/playground.example.tsx` file and access the playground [locally](http://localhost:3000/playground).

### How to increase the chance of being accepted?

Continuous Integration (CI) runs a series of checks automatically when a Pull Request is opened. If you're not
sure if your changes will pass, you can always open a Pull Request and the GitHub UI will display a summary of
the results. If any of them fail, refer to [Checks and how to fix them](#checks-and-how-to-fix-them).

Make sure the following is true:

<!-- #default-branch-switch -->

- The branch is targeted at `master` for ongoing development. We do our best to keep `master` in good shape, with all tests passing. Code that lands in `master` must be compatible with the latest stable release. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of `master` at any time.
- If a feature is being added:
  - If the result was already achievable with the core library, explain why this feature needs to be added to the core.
  - If this is a common use case, consider adding an example to the documentation.
- When adding new features or modifying existing ones, please include tests to confirm the new behavior. You can read more about our test setup in our test [README](https://github.com/danielmana/ui-packages/blob/HEAD/test/README.md).
- If props were added or prop types were changed, the TypeScript declarations were updated.
- The branch is not behind its target branch.

Because we will only merge a Pull Request for which all tests pass. The following items need to be true:

- The code is formatted. If the code was changed, run `yarn prettier`.
- The code is linted. If the code was changed, run `yarn lint`.
- The code is type-safe. If TypeScript sources/declarations were changed, `yarn typescript` passed.
- The API docs are up-to-date. If API was changed, run `yarn proptypes && yarn docs:api`.
- The demos are up-to-date. If demos were changed, make sure `yarn docs:typescript:formatted` does not introduce changes. See [about writing demos](#3-write-the-content-of-the-demo).
- The Pull Request title follows the pattern `[Component] Imperative commit message`. (See: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) for a great explanation).

#### Checks and how to fix them

If any of the checks fails click on the _Details_
link and review the logs of the build to find out why it failed.
For CircleCI you need to log in first.
No further permissions are required to view the build logs.
The following section gives an overview of what each check is responsible for.

##### ci/codesandbox

This task should not fail in isolation. It creates multiple sandboxes on CodeSandbox.com that use the version
of UI Packages that was built from this Pull Request. Use it to test more complex scenarios.

##### ci/circleci: checkout

A preflight check to see if the dependencies and lockfile are ok. Running `yarn`
and `yarn deduplicate` should fix most of the issues.

##### ci/circleci: test_static

Checks code format, and lints the repository. The log of the failed build should explain
how to fix the issues.

##### ci/circleci: test_unit-1

Runs the unit tests in a `jsdom` environment. If this fails then `yarn test:unit`
should<sup>[1](test/README.md#accessibility-tree-exclusion)</sup> fail locally as well. You can narrow the scope of tests run with `yarn test:unit --grep ComponentName`.
If `yarn test:unit` passes locally, but fails in CI, consider [Accessibility tree exclusion in CI](test/README.md#accessibility-tree-exclusion).

##### ci/circleci: test_browser-1

Runs the unit tests in multiple browsers (via BrowserStack). The log of the failed
build should list which browsers failed. If Chrome failed then `yarn test:karma`
should<sup>[1](test/README.md#accessibility-tree-exclusion)</sup> fail locally as well. If other browsers failed debugging might be trickier.
If `yarn test:karma` passes locally, but fails in CI, consider [Accessibility tree exclusion in CI](test/README.md#accessibility-tree-exclusion).

##### ci/circleci: test_regression-1

Renders tests in `test/regressions/tests` and makes screenshots. This step shouldn't
fail if the others pass. Otherwise, a maintainer will take a look. The screenshots
are evaluated in another step.

##### ci/circleci: test_types

Typechecks the repository. The log of the failed build should list all issues.

##### ci/circleci: test_bundle_size_monitor

This task is mostly responsible for monitoring the bundle size. It will only report
the size if the change exceeds a certain threshold. If it fails there's usually
something wrong with the way the packages or docs were built.

##### argos

Evaluates the screenshots taken in `test/regressions/tests` and fails if it detects
differences. This doesn't necessarily mean your Pull Request will be rejected as a failure
might be intended. Clicking on _Details_ will show you the differences.

##### deploy/netlify

Renders a preview of the docs with your changes if it succeeds. Otherwise `yarn docs:build`
or `yarn docs:export` usually fail locally as well.

#### codecov/project

Monitors coverage of the tests. A reduction in coverage isn't necessarily bad but
it's always appreciated if it can be improved.

#### Misc

There are various other checks done by Netlify to check the integrity of our docs. Click
on _Details_ to find out more about them.

### Updating the component API documentation

The component API in the component `propTypes` and under `docs/pages/api-docs` is auto-generated from the [JSDoc](https://jsdoc.app/about-getting-started.html) in the TypeScript declarations.
Be sure to update the documentation in the corresponding `.ts` files (e.g. `packages/ui-core/src/Button/ButtonProps.ts` for `<Button>`) and then run:

```sh
$ yarn proptypes
$ yarn docs:api
```

### Coding style

Please follow the coding style of the project. UI Packages repository uses prettier and eslint, so if possible, enable linting in your editor to get real-time feedback.

- `yarn prettier` reformats the code.
- `yarn lint` runs manually the linting rules.

Finally, when you submit a Pull Request, they are run again by our continuous integration tools, but hopefully, your code is already clean!

## How to add a new demo in the documentation

If, for example, you want to add new demos for the button component, you have to take the following steps:

### 1. Add a new React component file under the related directory

In this case, you are going to add the new file to the following directory:

```sh
docs/data/ui-core/components/button/
```

and give it a name: `DemoSuperButtons.tsx`.

### 2. Edit the page Markdown file

The Markdown file is the source for the website documentation. So, whatever you wrote there will be reflected on the website.
In this case, the file you need to edit is `docs/data/ui-core/components/button/button.md`.

```diff
+### Super buttons
+
+Sometimes, you need a super button to make your app looks **superb**. Yea ...
+
+{{"demo": "DemoSuperButtons.js"}}
```

### 3. Write the content of the demo

Write the demo in TypeScript, and only, in a \*.tsx file.
When you're done run `yarn docs:typescript:formatted` to automatically create the JavaScript version.

### 4. You are done 🎉

## How can I use a change that wasn't released yet?

[Codesandbox CI](https://codesandbox.io/docs/ci) is used to publish a working version of the packages for each pull request, "a preview".

In practice, you can check the Codesandbox CI status of a pull request to get the URL needed to install these preview packages:

```diff
diff --git a//package.json b//package.json
index 791a7da1f4..a5db13b414 100644
--- a/package.json
+++ b/package.json
@@ -61,7 +61,7 @@
   "dependencies": {
-    "@danielmana/ui-core": "0.1.0",
+    "@danielmana/ui-core": "https://pkg.csb.dev/danielmana/ui-packages/commit/371c952b/@danielmana/ui-core",
```

Alternatively, you can open the Netlify preview of the documentation, and open any demo in Codesandbox. The documentation automatically configures the dependencies to use the preview packages.

You can also package and test your changes locally.
The following example shows how to package `@danielmana/ui-core`, but you can package any UI module with this process:

```sh
$> cd packages/ui-core # or path to any other UI package
$packages\ui-core> yarn build
$packages\ui-core> cd ./build
$packages\ui-core> npm pack
```

Navigate to the build folder of your respective package and locate a file with the format `ui-core-x.x.x.tar.gz`.
Copy this file and move it to the project directory you want to test in, then run:

```sh
$test-project> npm i ./path-to-file/ui-core-x.x.x.tar.gz
```

:::info
If you have already installed this package, your changes will not be reflected when you reinstall it.
As a quick fix, you can temporarily bump the version number in your `package.json` before running `yarn build`.
:::
