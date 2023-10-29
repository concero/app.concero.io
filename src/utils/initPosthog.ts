import posthog from 'posthog-js'

export function initPosthog() {
	if (!process.env.DEVELOPMENT) {
		posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY, {
			api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
		})
		localStorage.setItem('app-concero-session-id', posthog.get_session_id())
		localStorage.setItem('app-concero-replay-id', posthog.get_distinct_id())
	}
}
