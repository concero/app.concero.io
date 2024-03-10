import { createContext, type ReactNode } from 'react'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export enum FeatureFlags {
	brighterConnectWalletButton = 'brighter_connect_wallet_button',
	newSwapScreenLayout = 'new_swap_screen_layout',
	default = 'default',
}

export const FeatureFlagContext = createContext<FeatureFlags>(FeatureFlags.default as FeatureFlags)

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
	let flag: FeatureFlags = FeatureFlags.default
	const isBrighterButton = useFeatureFlagVariantKey(FeatureFlags.brighterConnectWalletButton)

	if (isBrighterButton === true) {
		flag = FeatureFlags.brighterConnectWalletButton
	}

	// const payload = useActiveFeatureFlags()
	//
	// useEffect(() => {
	// 	console.log('Feature flag payload:', payload)
	// }, [payload])

	return <FeatureFlagContext.Provider value={flag}>{children}</FeatureFlagContext.Provider>
}
