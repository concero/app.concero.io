import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

export enum FeatureFlags {
	brighterConnectWalletButton = 'brighter_connect_wallet_button',
	default = 'default',
}

export function useFeatureFlag() {
	const [flag, setFlag] = useState<FeatureFlags>(FeatureFlags.default)

	useEffect(() => {
		if (posthog.getFeatureFlag('brighter_connect_wallet_button_ab') === 'brighter_button') {
			setFlag(FeatureFlags.brighterConnectWalletButton)
		}
	}, [posthog])

	return flag
}
