import { apiRequest } from '../requests'
import { post } from '../client'
import posthog from 'posthog-js'
import { config } from '../../constants/config'

export async function submitFeedback({ type, message, contact_option, contact_username, addNotification }): Promise<any> {
	if (!type || !message) return
	const url = `${config.baseURL}/log/feedback`

	const session_id = posthog.get_session_id()
	const replay_id = posthog.get_distinct_id()

	const body = { type, message, contact_option, contact_username, session_id, replay_id }
	function on_ok() {
		addNotification({
			title: 'Feedback submitted',
			message: 'Thank you for your feedback!',
			type: 'success',
		})
	}

	function on_error() {
		addNotification({
			title: 'Error submitting feedback',
			message: 'Please try again later',
			type: 'error',
		})
	}

	const { res, ok, err } = await apiRequest(await post(url, body))
	if (ok) on_ok()
	else on_error()

	return { res, ok, err }
}

export async function submitTx({ tx_id, status, session_id, replay_id, provider, tx_data }): Promise<any> {
	const url = `${config.baseURL}/log/tx`
	try {
		const data = { tx_id, status, session_id, replay_id, provider, tx_data }
		const res = await post(url, data)
		return res
	} catch (error) {
		console.error(error)
	}
}
