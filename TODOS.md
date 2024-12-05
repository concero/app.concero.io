
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
