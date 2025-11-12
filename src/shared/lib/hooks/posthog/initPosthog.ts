import { configEnvs } from '@/shared/consts/config/config'
import posthog from 'posthog-js'

export function initPosthog() {
	if (process.env.DEVELOPMENT !== 'true') {
		posthog.init(configEnvs.POSTHOG_API_KEY, {
			api_host: `${configEnvs.CONCERO_DOMAIN_URL}/posthog`,
			autocapture: false,
			disable_session_recording: true,
		})

		localStorage.setItem('app-concero-session-id', posthog.get_session_id())
		localStorage.setItem('app-concero-replay-id', posthog.get_distinct_id())

		posthog.setPersonPropertiesForFlags({ id: localStorage.getItem('app-concero-replay-id') })
	}
}
