import { useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { usePostHog } from 'posthog-js/react'
import { trackEvent } from './useTracking'
import { category } from './tracking'

export const useLoadPosthogInstance = (): void => {
	const { address } = useAccount()
	const posthog = usePostHog()

	const identify = useCallback(() => {
		if (!address || !posthog) return

		const isOnboarded = posthog.get_property('reward_onboarded')

		posthog.identify(address)

		if (!isOnboarded) {
			trackEvent({
				category: category.Wallet,
				action: 'user_connected_wallet',
				label: 'First time connection',
				data: {
					user_id: address,
					product: 'Rewards',
				},
			})

			posthog.register({ reward_onboarded: new Date().toISOString() })
		}
	}, [address, posthog])

	useEffect(() => {
		identify()
	}, [identify])
}
