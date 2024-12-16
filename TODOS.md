
# TODOS
## @concero/ui package

Contains only atomic and molecular components. No pages or screens, no complex components.
TLDR: Atoms are the smallest, state-less, indivisible components that can be used on their own, such as a button, input, or label. Molecules are slightly more complex, usually stateful, components based on the combination of two or more atoms, such as a search bar that includes an input atom and a button atom.

    atoms
        Button
        Card
        Alert
        Loader

    molecules
        TextInput
        Modal
        beacon
        Chart
        ...

    organisms
        Header
        HeaderMenu
        Footer
        ...

## New folder structure

    src
        assets
        constants
            abi
            animations
            translations
        hooks
        components - to be refactored to @concero-ui
        modules
            rewards
            pools
                api # all pool-related fetch hooks should be moved from global /api
                hooks # generic hooks that are shared across pool components
                screens
                components # should contain module-specific organisms. If you find yourself using atoms or molecules here, they should be generalised and moved to the ui kit.
                    cards
                        EarningsCard
                        ...
                    ComplexComponent
                        hooks
                        subcomponent1
                        subcomponent2
                        subcomponent3
                        module.pcss
                        index.tsx
                types
                utils
        styles
        utils
            web3
            i18n
            client.ts # api client
## Other
- Tanstack react-query for all data fetching
- All folders must contain an index.ts file that exports all files in the folder. All imports should be adjusted accordingly.
- Move loadingSkeletons checks to Suspense where possible.
- There is Input and TextInput, standardize on one.
- Leaderboard should be using Table component. Table should be a generic component that can be used in other modules.
- (later) error codes
## Bundling
needs to be fixed in accordance with the recommendations below. Async imports should be used for modules
```bash
dist/assets/index-8uTjJm2T.js                              87.57 kB │ gzip:  28.00 kB
dist/assets/index-C4KftXO4.js                             381.10 kB │ gzip: 113.66 kB
dist/assets/PoolCard-Ds5sk6xo.js                          624.59 kB │ gzip: 180.04 kB
dist/assets/index-CXS5X10Z.js                           2,595.55 kB │ gzip: 771.88 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```
