import { apiRequest } from '../requests'
import { post } from '../client'
import { headers } from '../bitquery/config'

export async function submitFeedback({ type, message }): Promise<any> {
  if (!type || !message) return
  const url = 'http://localhost:4000/api/feedback'
  const body = { type, message }

  function on_ok() {
    console.log('Feedback submitted successfully')
  }

  function on_error() {
    console.error('Error submitting feedback')
  }

  const { res, ok, err } = await apiRequest(await post(url, body, headers))
  if (ok) on_ok()
  else on_error()

  return { res, ok, err }
}
