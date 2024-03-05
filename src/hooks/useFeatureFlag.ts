import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

export enum FeatureFlags {
	brighterConnectWalletButton = 'brighter_connect_wallet_button',
	default = 'default',
}

export function useFeatureFlag() {
	const [flag, setFlag] = useState<FeatureFlags>(FeatureFlags.default)

	useEffect(() => {
		if (posthog.isFeatureEnabled(FeatureFlags.brighterConnectWalletButton)) {
			setFlag(FeatureFlags.brighterConnectWalletButton)
		}
	}, [posthog])

	return flag
}
