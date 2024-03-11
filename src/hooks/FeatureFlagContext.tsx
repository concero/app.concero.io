import { createContext, type ReactNode } from 'react'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export type FeatureFlags = Record<FeatureFlagKeys, string | boolean | undefined>
export enum FeatureFlagKeys {
	brighterConnectWalletButton = 'brighter_connect_wallet_button',
	newSwapScreenLayout = 'new_swap_card',
}
export enum FeatureFlagVariants {
	default = 'default',
	control = 'control',
	newSwapCard = 'new_swap_card',
}

export const FeatureFlagContext = createContext<FeatureFlags>({
	[FeatureFlagKeys.brighterConnectWalletButton]: undefined,
	[FeatureFlagKeys.newSwapScreenLayout]: undefined,
})

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
	const flags: FeatureFlags = {
		[FeatureFlagKeys.brighterConnectWalletButton]: undefined,
		[FeatureFlagKeys.newSwapScreenLayout]: undefined,
	}

	flags[FeatureFlagKeys.newSwapScreenLayout] = useFeatureFlagVariantKey(FeatureFlagKeys.newSwapScreenLayout)
	flags[FeatureFlagKeys.brighterConnectWalletButton] = useFeatureFlagVariantKey(
		FeatureFlagKeys.brighterConnectWalletButton,
	)

	return <FeatureFlagContext.Provider value={flags}>{children}</FeatureFlagContext.Provider>
}
