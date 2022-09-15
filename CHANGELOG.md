# Versions

## 5.10.5

<!-- generated comparing v5.10.4..master -->

_Sep 12, 2022_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- 🚀 [Blog post](https://mui.com/blog/introducing-mui-base/) for announcing the release of the MUI Base package is out thanks to @michaldudak.
- 🚀 Added [`Alert`](https://mui.com/joy-ui/react-alert/), [`Modal`](https://mui.com/joy-ui/react-modal/), [`ListSubheader`](https://mui.com/joy-ui/react-list-subheader/), [`FormControl`](https://mui.com/joy-ui/react-form-control/), [`CircularProgress`](https://mui.com/joy-ui/react-circular-progress/) components to Joy UI (#33859) @hbjORbj @siriwatknp
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.10.5`

- &#8203;<!-- 05 -->[ListItemText] Fix variant mapping in `primaryTypography` (#33880) @iamxukai
- &#8203;<!-- 03 -->[Timeline] Add left and right aligned timeline demos in docs (#34156) @ZeeshanTamboli

### `@mui/joy@5.0.0-alpha.45`

- &#8203;<!-- 20 -->[Joy UI] Add `CircularProgress` component (#33869) @hbjORbj
- &#8203;<!-- 19 -->[Joy UI] Add `FormControl` component (#34187) @siriwatknp
- &#8203;<!-- 18 -->[Joy UI] Add `ListSubheader` component (#34191) @siriwatknp
- &#8203;<!-- 17 -->[Joy UI] Add `Modal` component (#34043) @siriwatknp
- &#8203;<!-- 10 -->[Joy] Fix list value of false or 0 (zero) text is incorrectly grey (#34255) @kushagra010
- &#8203;<!-- 09 -->[Joy] Adjust typography decorator margin (#34257) @siriwatknp
- &#8203;<!-- 08 -->[Joy] Miscellaneous fixes (#34193) @siriwatknp
- &#8203;<!-- 07 -->[Radio][joy] Integrate with form control (#34277) @siriwatknp
- &#8203;<!-- 06 -->[Joy][textarea] Pass `textarea` props from `componentsProps` (#34223) @HexM7

### Docs

- &#8203;<!-- 16 -->[blog] Introducing MUI Base (#33778) @michaldudak
- &#8203;<!-- 13 -->[docs] Fix spelling error (#34209) @ChrystianDeMatos
- &#8203;<!-- 12 -->[docs] Improve link to the security policy (#34219) @oliviertassinari
- &#8203;<!-- 11 -->[docs] Fix typo in Joy UI's `Usage` docs (#34200) @zillion504
- &#8203;<!-- 02 -->[website] Add Lukas to the about page (#34284) @LukasTy
- &#8203;<!-- 01 -->[website] Update diamond sponsor URL (#34256) @oliviertassinari

### Core

- &#8203;<!-- 04 -->[test] Replace argos-cli with @argos-ci/core (#34178) @michaldudak
- &#8203;<!-- 15 -->[core] Create a script to generate codeowners (#34175) @michaldudak
- &#8203;<!-- 14 -->[core] Add RFC GH issue template (#33871) @bytasv

All contributors of this release in alphabetical order: @bytasv, @ChrystianDeMatos, @hbjORbj, @HexM7, @iamxukai, @kushagra010, @LukasTy, @michaldudak, @oliviertassinari, @siriwatknp, @ZeeshanTamboli, @zillion504

## 5.10.4

<!-- generated comparing v5.10.3..master -->

_Sep 5, 2022_

A big thanks to the 11 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Added [`Alert`](https://mui.com/joy-ui/react-alert/) component to Joy UI (#33859) @hbjORbj
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.10.4`

- &#8203;<!-- 22 -->[Avatar] Use structured / semantic markup for avatars and avatar groups (#33994) @paulschreiber
- &#8203;<!-- 05 -->[Steps] Use structured / semantic markup for steps and steppers (#34138) @paulschreiber

### `@mui/joy@5.0.0-alpha.44`

- &#8203;<!-- 23 -->[Alert][joy] Add `Alert` component (#33859) @hbjORbj
- &#8203;<!-- 08 -->[Joy] Make the description of `componentsProps` generic (#34140) @hbjORbj
- &#8203;<!-- 07 -->[Joy] Add tests / classes for `Breadcrumbs` component (#33860) @hbjORbj
- &#8203;<!-- 06 -->[Select][joy] Fix forwarding listbox `component` prop (#34172) @siriwatknp

### `@mui/base@5.0.0-alpha.96`

- &#8203;<!-- 21 -->[Select][base] Fix type issues that appeared with TS 4.8 (#34132) @michaldudak

### Docs

- &#8203;<!-- 15 -->[docs] Add `mui-color-input`, `mui-chips-input` and `mui-tel-input` into the related projects page (#34123) @viclafouch
- &#8203;<!-- 14 -->[docs] Update sponsors (#34157) @hbjORbj
- &#8203;<!-- 13 -->[docs] Move 5 component names to Title Case (#34118) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Fix the color contrast on optional API methods (#34127) @oliviertassinari
- &#8203;<!-- 11 -->[docs] Fix crash due to using wrong variable (#34171) @siriwatknp
- &#8203;<!-- 10 -->[docs] Fix a few Base typos (#33986) @ropereraLK
- &#8203;<!-- 09 -->[docs] Revise Joy UI "Overview" page copy (#34087) @samuelsycamore
- &#8203;<!-- 20 -->[blog] Fix social cards (#34160) @oliviertassinari
- &#8203;<!-- 03 -->[website] Allow deep linking to sponsors @oliviertassinari
- &#8203;<!-- 02 -->[website] Update job descriptions (#34134) @DanailH
- &#8203;<!-- 01 -->[website] Link Toolpad landing page @oliviertassinari

### Core

- &#8203;<!-- 19 -->[core] Move renovate config to the repository root (#34180) @oliviertassinari
- &#8203;<!-- 18 -->[core] Reinstate react/no-unused-prop-types eslint rule (#34125) @Janpot
- &#8203;<!-- 17 -->[core] Do not append `types` field to packages without index.d.ts (#33952) @michaldudak
- &#8203;<!-- 16 -->[core] Sanitize input in icon synonyms update script (#33989) @michaldudak
- &#8203;<!-- 04 -->[test] Allow to pass options to `mousePress` function (#34124) @cherniavskii

All contributors of this release in alphabetical order: @cherniavskii, @DanailH, @hbjORbj, @Janpot, @michaldudak, @oliviertassinari, @paulschreiber, @ropereraLK, @samuelsycamore, @siriwatknp, @viclafouch

## 5.10.3

<!-- generated comparing v5.10.2..master -->

_Aug 29, 2022_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- ⚡ @mnajdova implemented an alternative to OverridableComponent to achieve better dev-time performance (#32735)
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.10.3`

- [Autocomplete][material] Fix value overflow when `disableClearable` is used (#34053) @mnajdova
- [Autocomplete] Update unstyled demo to not import Material UI (#34060) @oliviertassinari
- [Slider] Remove SliderInput export from d.ts (#34055) @pieetrus
- [TablePagination] Fix select variant not working (#33974) @ZeeshanTamboli

### `@mui/system@5.10.3`

- [system] Fix mode blink when open multiple sessions (#33877) @siriwatknp

### `@mui/base@5.0.0-alpha.95`

- [Button][base] Prevent too many ref updates (#33882) @michaldudak
- [Select][base] Fix typo in listbox blur event handler (#34120) @ZeeshanTamboli
- [TrapFocus] Improve tab test and simplify demo (#34008) @EthanStandel

### `@mui/joy@5.0.0-alpha.43`

- [Joy] Fix `role` proptypes (#34119) @siriwatknp
- [Joy] Refine `componentsProps` for all components (#34077) @siriwatknp
- [Radio][joy] support `componentsProps` as a function (#34022) @siriwatknp
- [Select][joy] Improve the a11y on the select field demo (#34073) @mnajdova
- [Textarea][joy] Add `Textarea` component (#33975) @siriwatknp

### Docs

- [blog] Add Grid v2 announcement (#33926) @siriwatknp
- [blog] Making customizable components (#33183) @alexfauquette
- [blog] Improve SEO metadata (#33954) @oliviertassinari
- [docs] Add introduction Base component demos & general uplift (#33896) @danilo-leal
- [docs] Fix Gatsby sample config in CSS variables (#34024) @bicstone
- [docs] Fix 404 link from Joy to React Router (#34115) @oliviertassinari
- [docs] Fix typo in `Select` component (#34091) @HexM7
- [docs] Fix 301 links to tss's docs @oliviertassinari
- [docs] Fixing Joy UI usage snippet (#34049) @JonathanAsbury-SPS
- [docs] Fix missing JSX closing tag in Tooltip docs (#34064) @hoangph271
- [website] Add Toolpad to Navigation (#33937) @bharatkashyap
- [website] Improve SEO meta description for MUI X @oliviertassinari
- [website] Improve visual look of code demos (#34070) @oliviertassinari
- [website] Fix `DatePicker` component demo on the home page (#34054) @NaveenPantra

### Core

- [core] Offer alternative to `OverridableComponent` via module augmentation for better performance (#32735) @mnajdova
- [core] Fix prop-type warning in regression tests (#34086) @oliviertassinari
- [core] Specify code owners (#33995) @michaldudak
- [core] Fix scroll restoration (#34037) @oliviertassinari

All contributors of this release in alphabetical order: @alexfauquette, @bharatkashyap, @bicstone, @danilo-leal, @EthanStandel, @HexM7, @hoangph271, @JonathanAsbury-SPS, @michaldudak, @mnajdova, @NaveenPantra, @oliviertassinari, @pieetrus, @renovate[bot], @siriwatknp, @ZeeshanTamboli
