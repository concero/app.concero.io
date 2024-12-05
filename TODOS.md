
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
        components - to be refactored to @concero-ui
        modules
            rewards
            pools
                api
                hooks
                screens
                components # should contain module-specific organisms. If you find yourself using atoms or molecules here, they should be generalised and moved to the ui kit.
                    cards
                        EarningsCard
                        ...
                types
                utils
                translations
        utils
            web3
            client.ts # api client
