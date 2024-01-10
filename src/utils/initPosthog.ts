import posthog from 'posthog-js'
import { config } from '../constants/config'

export function initPosthog() {
	if (!process.env.DEVELOPMENT) {
		posthog.init(config.POSTHOG_API_KEY, {
			api_host: config.POSTHOG_HOST,
		})

		localStorage.setItem('app-concero-session-id', posthog.get_session_id())
		localStorage.setItem('app-concero-replay-id', posthog.get_distinct_id())
	}
}
