import { createContext, type ReactNode } from 'react'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export type FeatureFlags = Record<FeatureFlagKeys, string | boolean | undefined>
export enum FeatureFlagKeys {
	brighterConnectWalletButton = 'brighter_connect_wallet_button',
	testnetEnabled = 'testnet_enabled',
}
export enum FeatureFlagVariants {
	default = 'default',
	control = 'control',
	testnet = 'testnet_enabled',
}

export const FeatureFlagContext = createContext<FeatureFlags>({
	[FeatureFlagKeys.brighterConnectWalletButton]: undefined,
	[FeatureFlagKeys.testnetEnabled]: undefined,
})

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
	const flags: FeatureFlags = {
		[FeatureFlagKeys.brighterConnectWalletButton]: undefined,
		[FeatureFlagKeys.testnetEnabled]: undefined,
	}

	flags[FeatureFlagKeys.brighterConnectWalletButton] = useFeatureFlagVariantKey(
		FeatureFlagKeys.brighterConnectWalletButton,
	)
	flags[FeatureFlagKeys.testnetEnabled] = useFeatureFlagVariantKey(FeatureFlagKeys.testnetEnabled)

	return <FeatureFlagContext.Provider value={flags}>{children}</FeatureFlagContext.Provider>
}
