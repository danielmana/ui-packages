# Versions

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
