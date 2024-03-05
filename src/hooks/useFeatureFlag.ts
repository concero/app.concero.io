import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

export function useFeatureFlag() {
	const [flag, setFlag] = useState<string>('')

	useEffect(() => {
		posthog.onFeatureFlags(() => {
			if (posthog.isFeatureEnabled('Orange_button')) {
				console.log('Orange button is enabled')
				setFlag('Orange_button')
			}
		})
	}, [])

	return flag
}
