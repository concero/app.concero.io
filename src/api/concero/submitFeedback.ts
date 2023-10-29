import { apiRequest } from '../requests'
import { post } from '../client'
import posthog from 'posthog-js'

export async function submitFeedback({ type, message }): Promise<any> {
	if (!type || !message) return
	const url = `${process.env.CONCERO_API_URL}/log/feedback`

	const session_id = posthog.get_session_id()
	const replay_id = posthog.get_distinct_id()

	const body = { type, message, session_id, replay_id }
	function on_ok() {
		console.log('Feedback submitted successfully')
	}

	function on_error() {
		console.error('Error submitting feedback')
	}

	const { res, ok, err } = await apiRequest(await post(url, body))
	if (ok) on_ok()
	else on_error()

	return { res, ok, err }
}

export async function submitTx(data): Promise<any> {
	const url = `${process.env.CONCERO_API_URL}/tx`
	try {
		let res = await post(url, data)
		return res
	} catch (error) {
		console.error(error)
	}
}
